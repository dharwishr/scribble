# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_list_all_categorie
    get categories_path, headers: headers
    assert_response :success
    response_body = response.parsed_body
    all_categories = response_body["categories"]

    total_categories_count = Category.count

    assert_equal all_categories.length, total_categories_count
  end

  def test_should_create_valid_category
    post categories_path,
      params: { category: { title: "Test" } },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Category")
  end

  def test_shouldnt_create_category_without_name
    post categories_path,
      params: { category: { title: "" } },
      headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_creator_can_update_any_category_fields
    new_title = "#{@category.title}-(updated)"
    category_params = { category: { title: new_title } }

    put category_path(@category.id), params: category_params, headers: headers
    assert_response :success
    @category.reload
    assert_equal @category.title, new_title
  end

  def test_can_destroy_category
    delete category_path(@category.id), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_deleted", entity: "Category")
  end
end
