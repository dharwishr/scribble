# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy]
  def index
    @categories = Categories.all
  end

  def create
    category = Categories.new(category_params)
    last_position_number = Categories.maximum(:position)
    if last_position_number
      category.position = last_position_number.to_i + 1
    else
      category.position = 1
    end
    category.save!
    respond_with_success("successfully_created")
  end

  def update
    category = Categories.find_by!(id: params[:id])
    category.update!(category_params)
    respond_with_success("successfully_updated")
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
      @category = Categories.find_by!(id: params[:id])
    end
end
