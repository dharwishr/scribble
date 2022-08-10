# frozen_string_literal: true

class ChangeArticleOwnerIdToUserId < ActiveRecord::Migration[6.1]
  def change
    rename_column :articles, :article_owner_id, :user_id
  end
end
