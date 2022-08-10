# frozen_string_literal: true

class Eui::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show]

  def show
    render
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:id])
    end
end
