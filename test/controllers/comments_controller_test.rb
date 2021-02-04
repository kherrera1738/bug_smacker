require "test_helper"

class CommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @comment = comments(:one)
    @owner = users(:kev)
    @non_org = users(:johnny)
    @not_commenter = users(:vick)

    sign_in @owner
  end

  test "should get index" do
    get comments_url
    assert_response :success
  end

  test "should get new" do
    get new_comment_url
    assert_response :success
  end

  test "should create comment" do
    assert_difference('Comment.count') do
      post comments_url, params: { comment: { content: @comment.content, made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
    end

    assert_redirected_to comment_url(Comment.last)
  end

  test "should show comment" do
    get comment_url(@comment)
    assert_response :success
  end

  test "should get edit" do
    get edit_comment_url(@comment)
    assert_response :success
  end

  test "should update comment" do
    patch comment_url(@comment), params: { comment: { content: @comment.content, made_by_id: @comment.made_by_id, ticket_id: @comment.ticket_id } }
    assert_redirected_to comment_url(@comment)
  end

  test "should destroy comment" do
    assert_difference('Comment.count', -1) do
      delete comment_url(@comment)
    end

    assert_redirected_to comments_url
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

  test "should allow only people from organization to access resources" do
    sign_out @owner
    sign_in @non_org
    get comment_url(@comment)
    assert_redirected_to root_url
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
