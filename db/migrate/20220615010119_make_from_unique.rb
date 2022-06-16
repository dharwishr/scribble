# frozen_string_literal: true

class MakeFromUnique < ActiveRecord::Migration[6.1]
  def change
    add_index :redirections, :from, unique: true
  end
end
