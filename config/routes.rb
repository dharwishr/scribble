# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug
    resources :categories, except: %i[new edit], param: :id
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
