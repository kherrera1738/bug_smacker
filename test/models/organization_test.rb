require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @kev = users(:kev)
    @org1 = organizations(:org1)
  end

  test "should be valid" do
    assert @org1.valid?
  end

  test "invalid organization name" do
    @org2 = Organization.new(owner: @kev, name: "")
    
    # name should be present
    assert_not @org2.valid?

    # should be under 100 characters
    @org2.name = "o" * 101
    assert_not @org2.valid?
  end

  test "organization without owner" do
    @org2 = Organization.new(name: "org2")
    assert_not @org2.valid?
  end

  test "organization name should be unique" do
    @org2 = @kev.owned_organizations.build(name: "org1")
    assert_not @org2.valid?
  end

  test "organization can create project" do
    assert_difference('Project.count') do
      @org1.projects.create(name: 'a', description: "b")
    end
  end
end
