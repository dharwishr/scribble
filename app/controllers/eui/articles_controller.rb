# frozen_string_literal: true

class Eui::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show]
  after_action :increment_visits!, only: %i[show]

  def index
    articles = Article.all
    @published_articles = articles.published
  end

  def show
    render
  end

  private

    def increment_visits!
      @article.increment!(:visits)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:id])
    end
end
