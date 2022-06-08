# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    articles = Article.all
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("successfully_created")
  end

  def update
    article = Article.find_by!(slug: params[:slug])
    article.update!(article_params)
    respond_with_success("successfully_updated")
  end

  def show
    respond_with_json({ article: @article, assigned_category: @article.assigned_category })
  end

  def destroy
    @article.destroy!
    respond_with_json
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
