require "test_helper"

class CommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @comment = comments(:one)
    @owner = users(:kev)
    @non_org = users(:johnny)
    @not_commenter = users(:vick)

    sign_in @owner
  end

  test "should create comment" do
    assert_difference('Comment.count') do
      post comments_url, params: { comment: { content: @comment.content, made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
    end

    json_response = ActiveSupport::JSON.decode response.body
    assert_equal "text", json_response["content"]
    assert_equal "kev", json_response["madeBy"]
    assert_equal Comment.last.created_at.strftime("%b-%d-%Y, %I:%M %p"), json_response["createdAt"]
  end

  test "should update comment" do
    patch comment_url(@comment), params: { comment: { content: @comment.content, made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
  end

  test "should destroy comment" do
    assert_difference('Comment.count', -1) do
      delete comment_url(@comment)
    end
  end

  test "comments can only be made by team members" do
    assert_difference('Comment.count') do
      post comments_url, params: { comment: { content: @comment.content, made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
    end

    sign_out @owner
    sign_in @non_org
    assert_no_difference('Comment.count') do
      post comments_url, params: { comment: { content: @comment.content, made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
    end
  end

  test "should only allow commenter to update" do
    patch comment_url(@comment), params: { comment: { content: "a", made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
    @comment.reload
    assert_equal "a", @comment.content

    sign_out @owner
    sign_in @not_commenter
    patch comment_url(@comment), params: { comment: { content: "b", made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
    @comment.reload
    assert_equal "a", @comment.content
  end
end
