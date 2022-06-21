# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @owner = create(:user)
    @category = build(:category)
    @article = create(:article, category: @category, user: @owner)
    @owner_headers = headers(@creator)
  end

  def test_should_list_all_tasks_for_valid_user
    get articles_path, headers: @owner_headers
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
        article: {
          title: "Learn Ruby", body: "Learn Ruby", article_owner_id: @owner.id,
          assigned_category_id: @category.id, status: "published"
        }
      },
      headers: @owner_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "Article has been successfully created!"
  end

  def test_shouldnt_create_article_without_title
    post articles_path, params: {
      article: {
        title: "", body: "Learn Ruby",
        article_owner_id: @owner.id, assigned_category_id: @category.id, status: "published"
      }
    },
      headers: @owner_headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_creator_can_update_any_articles_fields
    new_title = "#{@article.title}-(updated)"
    article_params = { article: { title: new_title, assigned_category_id: 1 } }

    put article_path(@article.slug), params: article_params, headers: @owner_headers
    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.assigned_category_id, 1
  end

  def test_owner_can_change_status_of_article
    article_params = { article: { status: "published" } }

    put article_path(@article.slug), params: article_params, headers: @owner_headers
    assert_response :success
    @article.reload
    assert @article.published?
  end

  def test_can_destroy_article
    delete article_path(@article.slug), headers: @owner_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "Article has been successfully deleted!"
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.slug), headers: @owner_headers
    end
    assert_response :ok
  end

  def test_not_found_error_rendered_for_invalid_article_slug
    invalid_slug = "invalid-slug"

    get article_path(invalid_slug), headers: @owner_headers
    assert_response :not_found
    assert_equal response.parsed_body["error"], "Couldn't find Article"
  end

  def headers(user, options = {})
    {
      Accept: "application/json",
      "Content_Type" => "application/json"
    }.merge(options)
  end
end
