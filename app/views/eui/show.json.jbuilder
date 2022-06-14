json.id article.id
json.title article.title
json.slug article.slug
json.date article.created_at
json.assigned_category do
  json.extract! article.category,
    :category
end
