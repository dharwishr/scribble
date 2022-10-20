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

  def test_fetching_versioned_article_data_after_update
    article_title_1 = "#{@article.title}-(updated)-1"
    put article_path(@article.slug), params: { article: { title: article_title_1 } }, headers: headers
    get article_path(@article.slug) + "/versions/0", headers: headers
    assert_response :success
    response_article_version_title = response.parsed_body["article_version"]["title"]
    assert_equal response_article_version_title, @article.title
  end

  def test_article_retains_previous_version_data_after_update
    article_title_1 = "#{@article.title}-(updated)-1"
    put article_path(@article.slug), params: { article: { title: article_title_1 } }, headers: headers
    article_title_2 = "#{@article.title}-(updated)-2"
    put article_path(@article.slug), params: { article: { title: article_title_2 } }, headers: headers
    assert_equal article_title_1, @article.versions[2].reify.title
  end
end
