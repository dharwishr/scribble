# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    user = create(:user)
    @headers = headers(user)
  end

  def test_should_list_all_users
    get users_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["users"].length, User.count
  end

  def test_should_signup_user_with_valid_credentials
    post users_path, params: {
      user: {
        name: "Sam Smith",
        email: "sam@example.com"
      }
    }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "User")
  end

  def test_shouldnt_signup_user_with_invalid_credentials
    post users_path, params: {
      user: {
        name: "Sam Smith",
        email: "sam"
      }
    }, headers: @headers

    assert_response :unprocessable_entity
    assert_equal response.parsed_body["error"], "Email is invalid"
  end

  def headers(user, options = {})
    {
      Accept: "application/json",
      "Content_Type" => "application/json"
    }.merge(options)
  end
end
