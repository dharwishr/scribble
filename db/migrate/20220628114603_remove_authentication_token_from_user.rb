# frozen_string_literal: true

class RemoveAuthenticationTokenFromUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :authentication_token
  end
end
