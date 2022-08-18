json.article_version do
  json.extract! @restore_version,
    :id,
    :title,
    :body
  json.category_id @restore_version.category.id
  json.category_title @restore_version.category.title
end
