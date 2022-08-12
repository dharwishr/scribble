# frozen_string_literal: true

class Eui::CategoriesController < ApplicationController
  def index
    @categories = Category.joins(:articles).where(articles: { status: "published" }).order("position ASC")
  end
end
