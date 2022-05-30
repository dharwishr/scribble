# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    render html: "This is index action of Article controller"
  end
end
