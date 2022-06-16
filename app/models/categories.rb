# frozen_string_literal: true

class Categories < ApplicationRecord
  has_many :articles, foreign_key: :assigned_category_id, class_name: "Article"
end
