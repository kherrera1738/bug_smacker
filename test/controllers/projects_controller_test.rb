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

  test "should show project" do
    get project_url(@project)
    json_response = ActiveSupport::JSON.decode response.body

    # Check for correct section
    assert ["tickets", "description", "teamMembers", "teamUrl", 
            "orgUrl", "editUrl", "addTicketUrl"].all? { |key| json_response.key? key }
    assert_equal "MyText", json_response["description"]
    assert_equal manage_team_dashboard_path(@project), json_response["teamUrl"]
    assert_equal organization_dashboard_path(@project.organization), json_response["orgUrl"]
    assert_equal edit_project_path(@project), json_response["editUrl"]
    assert_equal add_ticket_path(@project), json_response["addTicketUrl"]

    # Check tickets 
    tickets = json_response["tickets"]
    assert_equal 1, tickets.length
    ticket = tickets[0] 
    assert "t1", ticket["title"]
    assert "high", ticket["priority"]
    assert "new", ticket["status"]
    assert "feature requests", ticket["type"]
    assert ticket_dashboard_path(@project.tickets.first), ticket["url"]

    # Check team members
    assert_equal [{"name"=>"val", "email"=>"val@example.com", "role"=>"PM"}, 
                  {"name"=>"vick", "email"=>"vick@example.com", "role"=>"Dev"}, 
                  {"name"=>"kev", "email"=>"kev@example.com", "role"=>"Admin"}],
                  json_response["teamMembers"]
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
  
    assert_redirected_to project_dashboard_path(@project)
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
