require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @kev = users(:kev)
    @org1 = organizations(:org1)
  end
  
  test "name should not be empty or too long" do
    @kev.name = ""
    assert_not @kev.valid?

    @kev.name = "a" * 101
    assert_not @kev.valid?
  end

  test "owned organizations should be referred to as owned_organizations" do
    assert @kev.owned_organizations.exists?(@org1.id)
  end

  test "organization should referrer to creator user as onwer" do
    assert_equal @kev, @org1.owner
  end

  test "user should be able to create an organization" do
    assert_difference('Organization.count') do
      @new_org = @kev.owned_organizations.create(name: "org2")
    end

    assert @kev.owned_organizations.where(name: @new_org.name)
    assert 2, @kev.owned_organizations.count 
  end

  test "when owner is deleted, all owned organizations should be deleted" do
    assert_difference('Organization.count', -1) do
      @kev.destroy
    end
  end
end
