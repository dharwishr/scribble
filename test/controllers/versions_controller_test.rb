# frozen_string_literal: true

require "test_helper"

class VersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @owner = create(:user)
    @category = create(:category)
    @article = create(:article, category: @category, user: @owner)
  end

  def test_versions_are_created
    new_title = "#{@article.title}-(updated)"
    article_params = {
      article:
            { title: new_title, category_id: 1 }
    }
    put article_path(@article.slug), params: article_params, headers: headers
    get article_path(@article.slug) + "/versions", headers: headers
    response_json = response.parsed_body
  end
end
