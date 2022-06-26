# frozen_string_literal: true

class RenameSettingsToOrganizations < ActiveRecord::Migration[6.1]
  def change
    rename_table :settings, :organizations
  end
end
