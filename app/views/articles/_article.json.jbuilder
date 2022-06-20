json.id article.id
json.title article.title
json.slug article.slug
json.author article.author
json.date article.created_at.strftime("%B %d, %Y")
json.status article.status
json.body article.body
json.assigned_category do
  json.extract! article.category,
    :id,
    :category
end
