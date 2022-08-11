# frozen_string_literal: true

class AddArticleVisitsToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :visits, :integer, default: 0
  end
end
