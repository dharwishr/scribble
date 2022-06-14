json.categories @categories do | category |
  json.extract! category,
    :id,
    :category,
    :position
  json.count category.articles.count
end