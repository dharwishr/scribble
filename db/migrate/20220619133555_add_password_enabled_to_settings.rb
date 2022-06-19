# frozen_string_literal: true

class AddPasswordEnabledToSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :settings, :password_enabled, :boolean, default: false, null: false
  end
end
