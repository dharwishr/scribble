# frozen_string_literal: true

json.id article.id
json.title article.title
json.slug article.slug
json.assigned_category do
  json.extract! article.assigned_category_id,
    :id,
    :category
end
