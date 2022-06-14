# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  def index
    articles = Article.all
    @draft_articles = articles.of_status(:draft)
    @published_articles = articles.of_status(:published)
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("successfully_created")
  end

  def update
    article = Article.find_by!(slug: params[:slug])
    article.update!(article_params)
    respond_with_success("successfully_updated") unless params.key?(:quiet)
  end

  def show
    respond_with_json({ article: @article, assigned_category: @article.assigned_category_id })
  end

  def destroy
    @article.destroy!
    respond_with_json
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :author, :assigned_category_id, :status)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
