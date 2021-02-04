require "test_helper"

class CommentTest < ActiveSupport::TestCase
  def setup
    @comment = comments(:one)
  end
  
  test "should have content be at most 1000 chars long" do
    @comment.content = "a" * 1001
    assert_not @comment.valid?

    @comment.content = "a" * 1000
    assert @comment.valid?    
  end

end
