# frozen_string_literal: true

class AddAuthorToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :author, :string, unique: true
    change_column_null :articles, :author, false
  end
end
