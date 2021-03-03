require "test_helper"

class TicketsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ticket = tickets(:one)
    @owner = users(:kev)
    @pm = users(:val)
    @dev = users(:vick)
    @dev2 = users(:aleah)
    sign_in @owner
  end

  test "should get index" do
    get tickets_url
    assert_response :success
  end

  test "should get new" do
    get new_ticket_url
    assert_response :success
  end

  test "should create ticket" do
    assert_difference('Ticket.count') do
      post tickets_url, params: { ticket: { description: @ticket.description, priority: @ticket.priority, project_id: @ticket.project_id, status: @ticket.status, ticket_type: @ticket.ticket_type, title: @ticket.title } }
    end

    assert_redirected_to ticket_dashboard_url(Ticket.last)
  end

  test "should show ticket" do
    get ticket_url(@ticket)
    assert_response :success
  end

  test "should get edit" do
    get edit_ticket_url(@ticket)
    assert_response :success
  end

  test "should update ticket" do
    patch ticket_url(@ticket), params: { ticket: { description: @ticket.description, priority: @ticket.priority, project_id: @ticket.project_id, status: @ticket.status, ticket_type: @ticket.ticket_type, title: @ticket.title } }
    assert_redirected_to ticket_dashboard_url(@ticket)
  end

  test "should destroy ticket" do
    assert_difference('Ticket.count', -1) do
      delete ticket_url(@ticket)
    end

    assert_redirected_to tickets_url
  end

  test "should be logged in to view resources" do
    sign_out @owner

    get tickets_url
    assert_redirected_to new_user_session_url

    sign_in @owner
    get tickets_url
    assert_response :success
  end

  test "should be able to assign dev" do
    patch ticket_url(@ticket), params: { ticket: { assigned_dev_id: @dev.id } }
    @ticket.reload
    assert_equal @dev.id, @ticket.assigned_dev_id
  end 

  test "should allow only Admins and PMs to assign devs" do
    sign_out @owner
    sign_in @dev
    patch ticket_url(@ticket), params: { ticket: {assigned_dev_id: @dev.id } }
    @ticket.reload
    assert_nil @ticket.assigned_dev_id

    sign_out @dev
    sign_in @pm
    patch ticket_url(@ticket), params: { ticket: {assigned_dev_id: @dev.id } }
    @ticket.reload
    assert_equal @dev.id, @ticket.assigned_dev_id
  end

  test "type status and priority edits" do
    sign_out @owner
    
    # non team member should not be allowed to edit
    sign_in @dev2
    patch ticket_url(@ticket), params: { ticket: { status: "open", priority: "low", ticket_type: "comments" } }
    @ticket.reload
    assert_equal "new", @ticket.status
    assert_equal "high", @ticket.priority
    assert_equal "feature requests", @ticket.ticket_type 

    # team member can edit parameters
    sign_out @dev2
    sign_in @dev
    assert_difference("History.count", 3) do
      patch ticket_url(@ticket), params: { ticket: { status: "open", priority: "low", ticket_type: "comments", assigned_dev_id: nil } }
    end
    @ticket.reload
    assert_equal "open", @ticket.status
    assert_equal "low", @ticket.priority
    assert_equal "comments", @ticket.ticket_type

    assert History.where(old_value: "new", new_value: "open", ticket_id: @ticket.id).exists?
    assert History.where(old_value: "high", new_value: "low", ticket_id: @ticket.id).exists?
    assert History.where(old_value: "feature requests", new_value: "comments", ticket_id: @ticket.id).exists?
  end

  test "should only allow assigned_dev to be from team members" do
    patch ticket_url(@ticket), params: { ticket: {assigned_dev_id: @dev2.id } }
    @ticket.reload
    assert_nil @ticket.assigned_dev_id

    patch ticket_url(@ticket), params: { ticket: {assigned_dev_id: @dev.id } }
    @ticket.reload
    assert_equal @dev.id, @ticket.assigned_dev_id
  end

  test "should only allow team members or submitter to edit title or description" do
    sign_out @owner

    # user not in team cannot edit paramters
    sign_in @dev2
    patch ticket_url(@ticket), params: { ticket: { title: "a", description: "a" } }
    @ticket.reload
    assert_equal "t1", @ticket.title
    assert_equal "t1", @ticket.description

    # user in team can edit parameters
    sign_out @dev2
    sign_in @dev
    patch ticket_url(@ticket), params: { ticket: { title: "a", description: "a" } }
    @ticket.reload
    assert_equal "a", @ticket.title
    assert_equal "a", @ticket.description

    @ticket.submitted_by = @dev2
    @ticket.save

    # submitter can edit paramters
    sign_out @dev
    sign_in @dev2
    patch ticket_url(@ticket), params: { ticket: { title: "b", description: "b" } }
    @ticket.reload
    assert_equal "b", @ticket.title
    assert_equal "b", @ticket.description
  end

  test "should not allow updates to project_id" do
    patch ticket_url(@ticket), params: { ticket: { project_id: projects(:proj2).id } }
    @ticket.reload
    assert_equal projects(:proj1).id, @ticket.project_id
  end
end
