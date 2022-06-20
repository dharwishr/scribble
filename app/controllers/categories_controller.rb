# frozen_string_literal: true

class CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :load_category!, only: %i[update destroy]
  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    last_position_number = Category.maximum(:position)
    if last_position_number
      category.position = last_position_number.to_i + 1
    else
      category.position = 1
    end
    category.save!
    respond_with_success("Category has been successfully created!")
  end

  def update
    category = Category.find_by!(id: params[:id])
    category.update!(category_params)
    respond_with_success("Category has been successfully updated!")
  end

  def destroy
    @category.destroy!
    respond_with_json
  end

  private

    def category_params
      params.require(:category).permit(:id, :category, :position)
    end

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end
end
