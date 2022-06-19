# frozen_string_literal: true

class AddAuthenticationTokenToSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :settings, :authentication_token, :string
  end
end
