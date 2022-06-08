# frozen_string_literal: true

json.article do
  json.partial! "articles/article", article: @article

  json.assigned_category do
    json.extract! @article.assigned_category,
      :category
  end
end
