# frozen_string_literal: true

json.id @article.id
json.title @article.title
json.slug @article.slug
json.body @article.body
json.date @article.created_at.strftime("%B %d, %Y")
json.category @article.category.category
