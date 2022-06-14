# frozen_string_literal: true

class EuiController < ApplicationController
  before_action :load_article!, only: %i[show]
  def index
    @categories = Category.all
  end

  def show
    respond_with_json({ article: @article, assigned_category: @article.assigned_category_id })
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
