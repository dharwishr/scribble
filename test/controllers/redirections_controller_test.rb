# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    redirection = create(:redirection)
    @headers = headers()
  end

  def test_should_list_all_redirections
    get redirections_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["redirections"].length, Redirections.count
  end

  def headers
    {
      Accept: "application/json",
      "Content_Type" => "application/json"
    }
  end
end
