# frozen_string_literal: true

class AddArticleOwnerIdToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :article_owner_id, :integer
  end
end
