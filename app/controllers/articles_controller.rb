# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]

  def index
    articles = Article.all
    @all_articles = articles
    @draft_articles = articles.draft
    @published_articles = articles.published
  end

  def create
    Article.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :category_id, :status, :user_id)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
