require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:kev)
    @organization = organizations(:org1)
    sign_in @user
  end

  test "should get index" do
    get organizations_url
    assert_response :success
  end

  test "should get new" do
    get new_organization_url
    assert_response :success
  end

  test "should create organization" do
    assert_difference('Organization.count') do
      post organizations_url, params: { organization: { name: "org3", owner_id: @organization.owner_id } }
    end

    assert_redirected_to organization_url(Organization.last)
  end

  test "should show organization" do
    get organization_url(@organization)
    assert_response :success
  end

  test "should get edit" do
    get edit_organization_url(@organization)
    assert_response :success
  end

  test "should update organization" do
    patch organization_url(@organization), params: { organization: { name: @organization.name, owner_id: @organization.owner_id } }
    assert_redirected_to organization_url(@organization)
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