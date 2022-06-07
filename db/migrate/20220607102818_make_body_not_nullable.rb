# frozen_string_literal: true

class MakeBodyNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :articles, :body, false
  end
end
