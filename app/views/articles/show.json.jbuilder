# frozen_string_literal: true

json.article do
  json.partial! "articles/article", article: @article
end
