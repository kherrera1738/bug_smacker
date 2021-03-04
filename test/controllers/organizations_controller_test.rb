require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:kev)
    @organization = organizations(:org1)
    sign_in @user
  end

  test "should show organization" do
    get organization_url(@organization)
    json_response = ActiveSupport::JSON.decode response.body

    # Check for correct urls and org info and project info are present
    assert_equal manage_roles_dashboard_path(@organization), json_response["rolesUrl"]
    assert_equal edit_organization_path(@organization), json_response["editUrl"]
    assert json_response.key?("info")
    assert json_response.key?("projects")
    
    # Check for correct data in info
    info = json_response["info"]
    assert info.key?("assigned")
    assert info.key?("types")
    assert info.key?("statuses")
    assert info.key?("priorities")

    # Check assigned data
    assigned = info["assigned"]
    assert_equal ["None"], assigned["labels"]
    assert_equal [1], assigned["data"]

    # Check types data
    types = info["types"]
    assert_equal ["bug/errors", "feature requests", "comments", "training/document requests"], types["labels"]
    assert_equal [0, 1, 0, 0], types["data"]

    # Check statuses data
    statuses = info["statuses"]
    assert_equal ["new", "open", "in progress", "resolved", "additional information required"], statuses["labels"]
    assert_equal [1, 0, 0, 0, 0], statuses["data"]

    # Check priorities data
    priorities = info["priorities"]
    assert_equal ["low", "medium", "high"], priorities["labels"]
    assert_equal [0, 0, 1], priorities["data"]

    # Check projects
    projects = json_response["projects"]
    assert_equal 1, projects.length

    # Check project
    project = projects[0]
    assert_equal "proj1", project["name"]
    assert_equal "org1", project["organization"]
    assert_equal project_dashboard_path(Project.last), project["url"]
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
