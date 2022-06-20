# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_not_be_valid_and_saved_without_name
    @category.category = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Category can't be blank"
  end
end
