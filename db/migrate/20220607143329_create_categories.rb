# frozen_string_literal: true

class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.references :article, null: false, foreign_key: true
      t.string :category
      t.timestamps
    end
  end
end
