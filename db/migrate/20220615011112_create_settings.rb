# frozen_string_literal: true

class CreateSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :settings do |t|
      t.string :name
      t.string :password_digest
      t.timestamps
    end
    add_column :users, :authentication_token, :string
    change_column_null :settings, :name, false
  end
end
