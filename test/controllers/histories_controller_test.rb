require "test_helper"

class HistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @owner = users(:kev)
    @ticket = tickets(:one)
    @dev = users(:vick)

    sign_in @owner
  end

  test "should create history when ticket is updated" do
    assert_difference('History.count') do
      patch ticket_url(@ticket), params: { ticket: {assigned_dev_id: @dev.id } }
    end

    @ticket.reload
    assert_equal @dev.name, History.last.new_value
    entry = History.last
    assert_equal "assigned dev", entry.change_type
    assert_equal "None", entry.old_value
    assert_equal "#{@dev.name}", entry.new_value
    assert_equal @owner.id, entry.changed_by_id
  end

  test "should format histories" do
    get ticket_url(@ticket)
    json_response = ActiveSupport::JSON.decode response.body
    history = json_response["histories"][0]
    assert_equal "assigned dev", history["changeType"]
    assert_equal "jo", history["oldVal"]
    assert_equal "vick", history["newVal"]
    assert_equal History.first.created_at.strftime("%b-%d-%Y, %I:%M %p"), history["changeDate"]
  end
end
