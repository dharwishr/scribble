# frozen_string_literal: true

class VersionsController < ApplicationController
  before_action :load_article_versions!, only: %i[index show]
  before_action :load_version!, only: %i[show]

  def index
    render
  end

  def show
    render
  end

  private

    def load_article_versions!
      @article = Article.find_by!(slug: params[:article_slug])
    end

    def load_version!
      @restore_version = @article.versions[params[:id].to_i + 1].reify
    end
end
