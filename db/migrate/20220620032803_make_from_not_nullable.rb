# frozen_string_literal: true

class MakeFromNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :redirections, :from, false
  end
end
