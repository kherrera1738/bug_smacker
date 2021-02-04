require "test_helper"

class HistoryTest < ActiveSupport::TestCase
  def setup
    @history = histories(:one)
  end

  test "should only allow change type from approved list" do
    @history.change_type = "A"
    assert_not @history.valid?

    @history.change_type = "title"
    assert @history.valid?
  end
end
