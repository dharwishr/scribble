# frozen_string_literal: true

class AddBodyToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :body, :string
  end
end
