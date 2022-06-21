# frozen_string_literal: true

require "test_helper"

class SettingsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @setting = Settings.create(id: 1, name: "Sitename", password: "12345678", password_enabled: true)
    @headers = headers()
  end

  def test_should_update_valid_site_name
    put settings_path(@setting.id),
      params: { name: "Sitename", password: "welcome123" },
      headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "Category has been successfully created!"
  end

  def headers
    {
      Accept: "application/json",
      "Content_Type" => "application/json"
    }
  end
end
