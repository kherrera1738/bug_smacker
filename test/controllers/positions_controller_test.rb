require "test_helper"

class PositionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @position = positions(:admin)
    @steff = users(:steff)
  end

  test "should get index" do
    get positions_url
    assert_response :success
  end

  test "should get new" do
    get new_position_url
    assert_response :success
  end

  test "should create position" do
    assert_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: @position.role, filled_by_id: @steff.id } }
    end

    assert_redirected_to position_url(Position.last)
  end

  test "should show position" do
    get position_url(@position)
    assert_response :success
  end

  test "should get edit" do
    get edit_position_url(@position)
    assert_response :success
  end

  test "should update position" do
    patch position_url(@position), params: { position: { organization_id: @position.organization_id, role: @position.role, filled_by_id: @steff.id } }
    assert_redirected_to position_url(@position)
  end

  test "should destroy position" do
    assert_difference('Position.count', -1) do
      delete position_url(@position)
    end

    assert_redirected_to positions_url
  end

  test "user should not be able to have two roles in same organization" do
    assert_no_difference('Position.count') do
      post positions_url, params: { position: { organization_id: @position.organization_id, role: @position.role, filled_by_id: @position.filled_by_id } }
    end
  end
end
