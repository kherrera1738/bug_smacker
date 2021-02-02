require "test_helper"

class ProjectTest < ActiveSupport::TestCase
  def setup
    @project = projects(:proj1)
    @owner = users(:kev)
    @organization = organizations(:org1)
    sign_in @owner
  end

  test "should be valid" do
    assert @project.valid?
  end

  test "name, description, organization must be present" do
    @project.name = ""
    assert_not @project.valid?

    @project.name = "aaa"
    @project.description = ""
    assert_not @project.valid?

    assert_not Project.create(name: "a", description: "c").valid?
  end

  test "name and description should be within length constraint" do
    @project.name = "a" * 101
    assert_not @project.valid?

    @project.name = "a"
    @project.description = "a" * 1001
    assert_not @project.valid?
  end
end
