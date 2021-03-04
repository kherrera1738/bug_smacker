require "test_helper"

class PositionsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @owner = users(:kev)
    @owner_pos = positions(:owner_pos)
    @admin = positions(:admin)
    @org1 = organizations(:org1)
    @steff = users(:steff)
    @aleah = users(:aleah)
    @jo = users(:jo)
    
    @owner2 = users(:johnny)
    @owner2_pos = positions(:admin_org2)

    sign_in @owner
  end

  test "should create position" do
    assert_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @admin.organization_id, role: @admin.role, filled_by_id: @steff.id } }
    end

    json_response = ActiveSupport::JSON.decode response.body
    assert json_response.key? "id"
    assert json_response.key?("role") and json_response["role"] == "Admin"
    assert json_response.key?("name") and json_response["name"] == "Steff"
    assert json_response.key? "uid"
  end

  test "should update position" do
    patch position_url(@admin), params: { position: { organization_id: @admin.organization_id, role: @admin.role, filled_by_id: @steff.id } }
  end

  test "should destroy position" do
    assert_difference('Position.count', -1) do
      delete position_url(@admin)
    end

    assert_redirected_to positions_url
  end

  test "user should not be able to have two roles in same organization" do
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @admin.organization_id, role: 'Dev', filled_by_id: @admin.filled_by_id } }
    end
  end

  test "owner role can be changed unless owner" do
    patch position_url(@admin), params: { position: { organization_id: @admin.organization_id, role: "Dev", filled_by_id: @admin.filled_by_id } }
    @admin.reload
    assert_equal "Dev", @admin.role
    
    patch position_url(@owner_pos), params: { position: { organization_id: @owner_pos.organization_id, role: "Dev", filled_by_id: @owner_pos.filled_by_id } }
    @owner_pos.reload
    assert_equal "Admin", @owner_pos.role
  end

  test "only admins can add positions to organization" do
    # user that is not part of organization
    sign_out @owner
    sign_in @aleah
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @admin.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end
    sign_out @aleah

    # usesr that does not have admin privledges
    sign_in @jo
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @admin.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end
    sign_out @jo

    # admin from other organization
    sign_in @owner2
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @admin.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end
    sign_out @owner2

    # valid admin
    sign_in @owner
    assert_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @admin.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end

    assert @admin.organization.positions.where(filled_by_id: @steff.id).exists?
  end

  test "edited position must be from same company" do
    patch position_url(@owner2_pos), params: { position: { organization_id: @owner2_pos.organization_id, role: 'Dev', filled_by_id: @owner2.id } }
    @owner2_pos.reload
    assert_equal "Admin", @owner2_pos.role

    sign_in @owner
    patch position_url(@admin), params: { position: { organization_id: @admin.organization_id, role: "Dev", filled_by_id: @admin.filled_by_id } }
    @admin.reload
    assert_equal "Dev", @admin.role
  end

  test "cannot edit own position" do
    sign_out @owner
    sign_in @owner2
    patch position_url(@owner2_pos), params: { position: { organization_id: @owner2_pos.organization_id, role: 'Dev', filled_by_id: @owner2.id } }
    @owner2_pos.reload
    assert_equal "Admin", @owner2_pos.role
  end

  test "should index organization positions" do
    get index_org_pos_url(@org1.id)
    json_response = ActiveSupport::JSON.decode response.body 
    assert_equal 6, json_response.length
    json_response.each do | pos |
      assert pos.key?("id") and !pos["id"].blank?
      assert pos.key?("role") and !pos["role"].blank?
      assert pos.key?("uid") and !pos["uid"].blank?
      assert pos.key?("name") and !pos["name"].blank?
    end
  end
end
