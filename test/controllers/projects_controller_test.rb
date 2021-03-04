require "test_helper"

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  def setup 
    @project = projects(:proj1)
    @org1 = organizations(:org1)
    @org2 = organizations(:org2)
    @user = users(:kev)
    @johnny = users(:johnny)
    @dev = users(:jo)
    @pm = users(:val)
    sign_in @user
  end

  test "should create project" do
    assert_difference('Project.count') do
      post projects_url, params: { project: { description: "proj4", name: "proj4", organization_id: @org1.id } }
    end

    project = Project.last
    json_response = ActiveSupport::JSON.decode response.body
    assert_equal "proj4", json_response["name"]
    assert_equal "org1", json_response["organization"]
    assert_equal project_dashboard_path(project), json_response["url"]

  end

  test "should get edit" do
    get edit_project_url(@project)
    assert_response :success
  end

  test "should update project" do
    patch project_url(@project), params: { project: { description: @project.description, name: @project.name, organization_id: @project.organization_id } }
  end

  test "should destroy project" do
    assert_difference('Project.count', -1) do
      delete project_url(@project)
    end

    assert_redirected_to projects_url
  end

  test "organization cannot be changed" do
    patch project_url(@project), params: { project: { description: @project.description, name: @project.name, organization_id: @org2.id } }
    @project.reload
    assert_equal @org1.id, @project.organization_id
  end

  test "only admins can create project" do
    sign_out @user
    sign_in @dev
    assert_no_difference('Project.count') do
      post projects_url, params: { project: { description: "proj3", name: "proj3", organization_id: @org2.id } }
    end

    sign_in @johnny
    assert_difference('Project.count') do
      post projects_url, params: { project: { description: "proj3", name: "proj3", organization_id: @org2.id } }
    end
  end

  test "only PM and Admin can edit project parameters" do
    patch project_url(@project), params: { project: { description: @project.description, name: "a", organization_id: @project.organization_id } }
    @project.reload
    assert_equal "a", @project.name

    sign_out @user
    sign_in @dev
    patch project_url(@project), params: { project: { description: @project.description, name: "b", organization_id: @project.organization_id } }
    @project.reload
    assert_not_equal "b", @project.name

    sign_out @dev
    sign_in @pm
    patch project_url(@project), params: { project: { description: @project.description, name: "b", organization_id: @project.organization_id } }
    @project.reload
    assert_equal "b", @project.name
  end

  test "should add organization owner when created" do
    assert_difference('TeamMember.count') do
      post projects_url, params: { project: { description: "proj4", name: "proj4", organization_id: @org1.id } }
    end

    assert Project.find_by(name: "proj4").team_members.where(user_id: @org1.owner_id).exists? 
  end
end
