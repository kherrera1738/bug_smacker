require "test_helper"

class PositionTest < ActiveSupport::TestCase
  def setup
    @kev = users(:kev)
    @steff = users(:steff)
    @org = organizations(:org1)
    @position = positions(:admin)
  end

  test "invalid position" do
    # invalid role
    @position.role = ""
    assert_not @position.valid?

    # role is not approved
    @position.role = "Moderator"
    assert_not @position.valid?

    # No organization
    @position = Position.new(filled_by_id: @steff.id)
    assert_not @position.valid?

    # No filled_by value
    @position = Position.new(organization_id: @org.id)
    assert_not @position.valid?
  end
end
