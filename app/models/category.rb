# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, foreign_key: :assigned_category_id, class_name: "Article"
  acts_as_list
end
