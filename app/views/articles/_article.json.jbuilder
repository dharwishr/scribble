json.id article.id
json.title article.title
json.slug article.slug
json.author article.author
json.date article.created_at
json.assigned_category do
  json.extract! article.category,
    :id,
    :category
end
