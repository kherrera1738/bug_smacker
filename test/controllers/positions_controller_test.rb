require "test_helper"

class PositionsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @position = positions(:admin)
    @steff = users(:steff)
    @aleah = users(:aleah)
    @jo = users(:jo)
    @johnny = users(:johnny)
    @johnny_pos = positions(:admin_org2)
    @owner = users(:kev)
    @owned_org = organizations(:org1)
    @owner_pos = positions(:owner_pos)
  end

  test "should get index" do
    sign_in @owner
    get positions_url
    assert_response :success
  end

  test "should get new" do
    sign_in @owner
    get new_position_url
    assert_response :success
  end

  test "should create position" do
    sign_in @owner
    assert_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: @position.role, filled_by_id: @steff.id } }
    end

    assert_redirected_to position_url(Position.last)
  end

  test "should show position" do
    sign_in @owner
    get position_url(@position)
    assert_response :success
  end

  test "should get edit" do
    sign_in @owner
    get edit_position_url(@position)
    assert_response :success
  end

  test "should update position" do
    sign_in @owner
    patch position_url(@position), params: { position: { organization_id: @position.organization_id, role: @position.role, filled_by_id: @steff.id } }
    assert_redirected_to position_url(@position)
  end

  test "should destroy position" do
    sign_in @owner
    assert_difference('Position.count', -1) do
      delete position_url(@position)
    end

    assert_redirected_to positions_url
  end

  test "user should not be able to have two roles in same organization" do
    sign_in @owner
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: 'Dev', filled_by_id: @position.filled_by_id } }
    end
  end

  test "owner role can be changed unless owner" do
    sign_in @owner
    patch position_url(@position), params: { position: { organization_id: @position.organization_id, role: "Dev", filled_by_id: @position.filled_by_id } }
    @position.reload
    assert_equal "Dev", @position.role
    
    patch position_url(@owner_pos), params: { position: { organization_id: @owner_pos.organization_id, role: "Dev", filled_by_id: @owner_pos.filled_by_id } }
    @owner_pos.reload
    assert_equal "Admin", @owner_pos.role
  end

  test "only admins can add positions to organization" do
    # user that is not part of organization
    sign_in @aleah
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end
    sign_out @aleah

    # usesr that does not have admin privledges
    sign_in @jo
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end
    sign_out @jo

    # admin from other organization
    sign_in @johnny
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end
    sign_out @johnny

    # valid admin
    sign_in @owner
    assert_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: 'Dev', filled_by_id: @steff.id } }
    end

    assert @position.organization.positions.where(filled_by_id: @steff.id).exists?
  end

  test "edited position must be from same company" do
    sign_in @owner
    patch position_url(@johnny_pos), params: { position: { organization_id: @johnny_pos.organization_id, role: 'Dev', filled_by_id: @johnny.id } }
    @johnny_pos.reload
    assert_equal "Admin", @johnny_pos.role

    sign_in @owner
    patch position_url(@position), params: { position: { organization_id: @position.organization_id, role: "Dev", filled_by_id: @position.filled_by_id } }
    @position.reload
    assert_equal "Dev", @position.role
  end

  test "cannot edit own position" do
    sign_in @johnny
    patch position_url(@johnny_pos), params: { position: { organization_id: @johnny_pos.organization_id, role: 'Dev', filled_by_id: @johnny.id } }
    @johnny_pos.reload
    assert_equal "Admin", @johnny_pos.role
  end
end
