# frozen_string_literal: true

class AddForeignKeyToCategory < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :categories, column: :assigned_category_id
  end
end
