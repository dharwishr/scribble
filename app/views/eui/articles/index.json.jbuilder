json.articles @published_articles do | published_article |
  json.extract! published_article,
    :id,
    :title,
    :slug
end
