# frozen_string_literal: true

require "test_helper"

class Eui::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @owner = create(:organization)
    @user = create(:user)
    @category = build(:category)
    @article = create(:article, category: @category, user: @user)
    @owner_headers = auth_headers(@owner)
  end

  def test_not_found_error_rendered_for_invalid_article_slug
    invalid_slug = "invalid-slug"

    get article_path(invalid_slug), headers: @owner_headers
    assert_response :not_found
    assert_equal response.parsed_body["error"], "Couldn't find Article"
  end
end
