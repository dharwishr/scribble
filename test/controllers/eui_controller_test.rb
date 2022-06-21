# frozen_string_literal: true

require "test_helper"

class EuiControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @owner = create(:user)
    @category = build(:category)
    @article = create(:article, category: @category, user: @owner)
    @owner_headers = headers(@owner)
  end

  def test_not_found_error_rendered_for_invalid_article_slug
    invalid_slug = "invalid-slug"

    get eui_path(invalid_slug), headers: @owner_headers
    assert_response :not_found
    assert_equal response.parsed_body["error"], "Couldn't find Article"
  end

  def headers(user, options = {})
    {
      Accept: "application/json",
      "Content_Type" => "application/json",
      "X-Auth-Token" => user.authentication_token
    }.merge(options)
  end
end
