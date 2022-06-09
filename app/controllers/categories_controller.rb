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

  def update
    category = Category.find_by!(id: params[:id])
    category.update!(category_params)
    respond_with_success("successfully_updated")
  end

  def destroy
    @category.destroy!
    respond_with_json
  end

  private

    def category_params
      params.require(:category).permit(:id, :category)
    end

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end
end
