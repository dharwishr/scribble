# frozen_string_literal: true

class ChangePasswordEnabledToIsPasswordEnabled < ActiveRecord::Migration[6.1]
  def change
    rename_column :organizations, :password_enabled, :is_password_enabled
  end
end
