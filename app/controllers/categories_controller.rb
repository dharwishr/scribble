# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render status: :ok, json: { categories: categories }
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success("successfully_created")
  end

  private

    def category_params
      params.require(:category).permit(:category)
    end

    def load_category!
      @category = Category.find_by!(slug: params[:slug])
    end
end
