require "test_helper"

class TeamMembersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @team_member = team_members(:one)
    @pm = users(:val)
    @owner = users(:kev)
    @dev = users(:jo)
    @dev2 = users(:aleah) 
    @proj1 = projects(:proj1)
    @other_org_user = users(:johnny)
    sign_in @owner
  end

  test "should get index" do
    get team_members_url
    assert_response :success
  end

  test "should get new" do
    get new_team_member_url
    assert_response :success
  end

  test "should create team_member if does not already exist or in same organization" do
    assert_no_difference('TeamMember.count') do
      post team_members_url, params: { team_member: { project_id: @team_member.project_id, user_id: @team_member.user_id } }
    end

    sign_in @owner
    assert_no_difference('TeamMember.count') do
      post team_members_url, params: { team_member: { project_id: @team_member.project_id, user_id: @other_org_user.id } }
    end

    sign_in @owner
    assert_difference('TeamMember.count') do
      post team_members_url, params: { team_member: { project_id: @team_member.project_id, user_id: @dev.id } }
    end

    assert_redirected_to team_member_url(TeamMember.last)
  end

  test "should show team_member" do
    get team_member_url(@team_member)
    assert_response :success
  end

  test "should get edit" do
    get edit_team_member_url(@team_member)
    assert_response :success
  end

  test "should update team_member" do
    patch team_member_url(@team_member), params: { team_member: { project_id: @team_member.project_id, user_id: @team_member.user_id } }
    assert_redirected_to team_member_url(@team_member)
  end

  test "should destroy team_member" do
    assert_difference('TeamMember.count', -1) do
      delete team_member_url(@team_member)
    end

    assert_redirected_to team_members_url
  end

  test "only PM and Admin can add users team" do
    assert_difference('TeamMember.count') do
      post team_members_url, params: { team_member: { project_id: @proj1.id, user_id: @dev2.id } }
    end

    sign_out @owner
    sign_in @dev2
    assert_no_difference('TeamMember.count') do
      post team_members_url, params: { team_member: { project_id: @proj1.id, user_id: @dev.id } }
    end

    sign_out @dev2
    sign_in @pm
    assert_difference('TeamMember.count') do
      post team_members_url, params: { team_member: { project_id: @proj1.id, user_id: @dev.id } }
    end
  end
end
