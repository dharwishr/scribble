json.article do
  json.extract! @article,
    :id,
    :title,
    :body
  json.date @article.created_at.strftime("%B %d, %Y")
  json.category @article.category.title
end
