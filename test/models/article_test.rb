# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @user = build(:user)
    @category = build(:category)
    @article = create(:article, category: @category, user: @user)
  end

  def test_values_of_created_at_and_updated_at
    article = Article.new(
      title: "This is a test article", body: "This is a test article body", author: "Oliver Smith",
      category: @category)
    assert_nil article.created_at
    assert_nil article.updated_at

    article.save!
    assert_not_nil article.created_at
    assert_equal article.updated_at, article.created_at

    article.update!(title: "This is a updated article")
    assert_not_equal article.updated_at, article.created_at
  end
end
