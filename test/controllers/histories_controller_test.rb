require "test_helper"

class HistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @history = histories(:one)
    @owner = users(:kev)
    @ticket = tickets(:one)
    @dev = users(:vick)

    sign_in @owner
  end

  test "should get index" do
    get histories_url
    assert_response :success
  end

  test "should get new" do
    get new_history_url
    assert_response :success
  end

  test "should create history" do
    assert_difference('History.count') do
      post histories_url, params: { history: { change_type: @history.change_type, changed_by_id: @history.changed_by_id, new_value: @history.new_value, old_value: @history.old_value, ticket_id: @history.ticket_id } }
    end

    assert_redirected_to history_url(History.last)
  end

  test "should show history" do
    get history_url(@history)
    assert_response :success
  end

  test "should get edit" do
    get edit_history_url(@history)
    assert_response :success
  end

  test "should update history" do
    patch history_url(@history), params: { history: { change_type: @history.change_type, changed_by_id: @history.changed_by_id, new_value: @history.new_value, old_value: @history.old_value, ticket_id: @history.ticket_id } }
    assert_redirected_to history_url(@history)
  end

  test "should destroy history" do
    assert_difference('History.count', -1) do
      delete history_url(@history)
    end

    assert_redirected_to histories_url
  end

  test "should create history when ticket is updated" do
    assert_difference('History.count') do
      patch ticket_url(@ticket), params: { ticket: {assigned_dev_id: @dev.id } }
    end

    @ticket.reload
    assert @ticket.histories.where(new_value: "#{@dev.id}").exists?
    entry = @ticket.histories.find_by(new_value: "#{@dev.id}")
    assert_equal "assigned dev", entry.change_type
    assert_equal "nil", entry.old_value
    assert_equal "#{@dev.id}", entry.new_value
    assert_equal @owner.id, entry.changed_by_id
  end
end
