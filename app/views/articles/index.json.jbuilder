json.articles do
  json.draft @draft_articles do | draft_article |
    json.partial! "articles/article", article: draft_article
  end
  json.published @published_articles do | published_article |
    json.partial! "articles/article", article: published_article
  end
end
