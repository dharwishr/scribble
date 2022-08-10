# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = build(:category)
    @owner = create(:organization)
    @owner_headers = auth_headers(@owner)
  end

  def test_should_list_all_categories
    get categories_path, headers: @owner_headers
    assert_response :success
    response_body = response.parsed_body
    all_categories = response_body["categories"]

    total_categories_count = Category.count

    assert_equal all_categories.length, total_categories_count
  end
end
