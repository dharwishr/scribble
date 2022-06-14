json.categories @categories do | category |
  json.extract! category,
    :id,
    :category,
    :position
  json.articles category.articles
end
