# frozen_string_literal: true

class ChangeCategoryColumnNameToTitle < ActiveRecord::Migration[6.1]
  def change
    rename_column :categories, :category, :title
  end
end
