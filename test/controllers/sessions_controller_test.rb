# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @setting = Settings.create(name: "Sitename", password: "12345678", password_enabled: true)
  end

  def test_should_login_user_with_valid_credentials
    post session_path, params: { login: { password: @setting.password } }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @setting.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post session_path, params: { login: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("session.incorrect_credentials")
  end
end
