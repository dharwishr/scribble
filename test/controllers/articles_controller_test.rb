# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @owner = create(:user)
    @category = create(:category)
    @article = create(:article, category: @category, user: @owner)
  end

  def test_should_list_all_tasks_for_valid_user
    get articles_path, headers: headers
    assert_response :success
    response_body = response.parsed_body
    all_articles = response_body["articles"]

    draft_articles_count = Article.where(status: "draft").count
    published_articles_count = Article.where(status: "published").count

    assert_equal all_articles["draft"].length, draft_articles_count
    assert_equal all_articles["published"].length, published_articles_count
  end

  def test_should_create_valid_article
    post articles_path,
      params: {
        article:
        {
          title: "Learn Ruby", body: "Learn Ruby", user_id: @owner.id,
          category_id: @category.id, status: "published"
        }
      },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_shouldnt_create_article_without_title
    post articles_path, params: {
      article:
      {
        title: "", body: "Learn Ruby",
        user_id: @owner.id, category_id: @category.id, status: "published"
      }

    },
      headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_creator_can_update_any_articles_fields
    new_title = "#{@article.title}-(updated)"
    article_params = {
      article:
            { title: new_title, category_id: 1 }
    }
    put article_path(@article.slug), params: article_params, headers: headers
    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.category_id, 1
  end

  def test_owner_can_change_status_of_article
    article_params = { article: { status: "published" } }
    put article_path(@article.slug), params: article_params, headers: headers
    assert_response :success
    @article.reload
    assert @article.published?
  end

  def test_can_destroy_article
    delete article_path(@article.slug), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_deleted", entity: "Article")
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.slug), headers: headers
    end
    assert_response :ok
  end

  def test_not_found_error_rendered_for_invalid_article_slug
    invalid_slug = "invalid-slug"

    get article_path(invalid_slug), headers: headers
    assert_response :not_found
    assert_equal response.parsed_body["error"], "Couldn't find Article"
  end
end
