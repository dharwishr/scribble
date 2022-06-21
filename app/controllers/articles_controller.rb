# frozen_string_literal: true

class ArticlesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :load_article!, only: %i[show update destroy]
  def index
    articles = Article.all
    @all_articles = articles
    @draft_articles = articles.of_status(:draft)
    @published_articles = articles.of_status(:published)
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("Article has been successfully created!")
  end

  def update
    article = Article.find_by!(slug: params[:slug])
    article.update!(article_params)
    respond_with_success("Article has been successfully updated!") unless params.key?(:quiet)
  end

  def show
    render
  end

  def destroy
    @article.destroy!
    respond_with_success("Article has been successfully deleted!") unless params.key?(:quiet)
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :assigned_category_id, :status, :article_owner_id)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
