# frozen_string_literal: true

class EuiController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :load_article!, only: %i[show]
  def index
    @categories = Category.all
  end

  def show
    render
  end

  private

    def eui_params
      params.permit(:slug)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:id])
      puts @article
    end
end
