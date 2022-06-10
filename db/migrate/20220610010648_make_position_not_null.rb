# frozen_string_literal: true

class MakePositionNotNull < ActiveRecord::Migration[6.1]
  def change
    change_column_null :categories, :position, false
  end
end
