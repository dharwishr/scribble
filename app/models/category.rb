# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_LENGTH = 35
  has_many :articles, dependent: :delete_all
  validates :title, presence: true, length: { maximum: MAX_CATEGORY_LENGTH }
  acts_as_list
end
