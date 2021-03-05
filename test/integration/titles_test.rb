require "test_helper"

class TitlesTest < ActionDispatch::IntegrationTest
  def setup
    @owner = users(:kev)
    @base_title = 'Bug Smacker'
  end

  test "should have dynamic titles" do
    get new_user_session_url
    assert_select "title", "Log In | #{@base_title}"

    get new_user_registration_url
    assert_select "title", "Sign Up | #{@base_title}"

    get trial_organization_url
    assert_select "title", "Trial Organization Dashboard | #{@base_title}"

    get trials_edit_organization_url
    assert_select "title", "Trial Edit Organization | #{@base_title}"

    get trials_manage_roles_url
    assert_select "title", "Trial Roles Management | #{@base_title}"

    sign_in @owner

    get edit_user_registration_url
    assert_select "title", "Edit Profile | #{@base_title}"

    get user_dashboard_url(@owner.id)
    assert_select "title", "Main Dashboard | #{@base_title}"

    get organization_dashboard_url(Organization.first)
    assert_select "title", "Organization Dashboard | #{@base_title}"

    get edit_organization_url(Organization.first)
    assert_select "title", "Edit Organization | #{@base_title}"

    get manage_roles_dashboard_url(Organization.first)
    assert_select "title", "Roles Management | #{@base_title}"

    get project_dashboard_url(Project.first)
    assert_select "title", "Project Dashboard | #{@base_title}"

    get manage_team_dashboard_url(Project.first)
    assert_select "title", "Team Management | #{@base_title}"
  end
end
