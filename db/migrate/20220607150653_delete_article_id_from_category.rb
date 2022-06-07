# frozen_string_literal: true

class DeleteArticleIdFromCategory < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :article_id
  end
end
