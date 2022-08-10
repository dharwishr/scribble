# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_values_of_created_at_and_updated_at
    category = Category.new(
      title: "This is a test category")
    assert_nil category.created_at
    assert_nil category.updated_at

    category.save!
    assert_not_nil category.created_at
    assert_equal category.updated_at, category.created_at

    category.update!(title: "This is a updated category")
    assert_not_equal category.updated_at, category.created_at
  end

  def test_category_should_not_be_valid_and_saved_without_name
    @category.title = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Title can't be blank"
  end

  def test_exception_raised
    assert_raises ActiveRecord::RecordNotFound do
      Category.find(SecureRandom.uuid)
    end
  end

  def test_category_count_increases_on_saving
    assert_difference ["Category.count"], 1 do
      create(:category)
    end
  end
end
