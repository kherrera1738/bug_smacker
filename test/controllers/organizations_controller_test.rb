require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:kev)
    @organization = organizations(:org1)
    sign_in @user
  end

  test "should create organization" do
    assert_difference('Organization.count') do
      post organizations_url, params: { organization: { name: "org3", owner_id: @organization.owner_id } }
    end

    json_response = ActiveSupport::JSON.decode response.body
    assert_equal "org3", json_response["organization"]
    assert_equal "Admin", json_response["role"]
    assert_equal organization_dashboard_path(Organization.last.id), json_response["url"]
    assert_equal "True", json_response["owned"]

  end

  test "should get edit" do
    get edit_organization_url(@organization)
    assert_response :success
  end

  test "should update organization" do
    patch organization_url(@organization), params: { organization: { name: @organization.name, owner_id: @organization.owner_id } }
    assert_redirected_to organization_dashboard_url(@organization)
  end

  test "should destroy organization" do
    assert_difference('Organization.count', -1) do
      delete organization_url(@organization)
    end

    assert_redirected_to organizations_url
  end

  test "organization creates owner admin account after self save" do
    assert_difference('Organization.count') do
      post organizations_url, params: { organization: { name: "org3", owner_id: @organization.owner_id } }
    end

    @org2 = Organization.where(name: "org3").first
    assert @org2.positions.where(filled_by_id: @org2.owner_id).exists?
  end
end
