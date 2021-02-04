require "test_helper"

class TicketTest < ActiveSupport::TestCase
  def setup
    @ticket = tickets(:one)
    @dev = users(:vick)
    @dev2 = users(:aleah)
  end

  test "should have title at most 100 char long" do
    @ticket.title = "a" * 101
    assert_not @ticket.valid?
  end

  test "should have description be at most 1000 char long" do
    @ticket.description = "a" *1001
    assert_not @ticket.valid?
  end

  test "should only allow type value from approved list" do
    @ticket.ticket_type = "a"
    assert_not @ticket.valid?

    @ticket.ticket_type = "bug/errors"
    assert @ticket.valid?
  end

  test "should only allow status value from approved list" do
    @ticket.status = "a"
    assert_not @ticket.valid?

    @ticket.status = "open"
    assert @ticket.valid?
  end

  test "should only allow priority value from approved list" do
    @ticket.priority = "a"
    assert_not @ticket.valid?

    @ticket.priority = "low"
    assert @ticket.valid?
  end

  test "should persist with assigned_dev and submitted_by deleted" do
    @ticket.assigned_dev = @dev
    @ticket.submitted_by = @dev2
    @ticket.save
    
    @dev.destroy
    @dev2.destroy

    @ticket.reload

    assert_nil @ticket.assigned_dev
    assert_nil @ticket.submitted_by
  end
end
