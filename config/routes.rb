# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug
    resources :categories, except: %i[new edit]
    resources :users, only: %i[create index]
    namespace :eui do
      resources :articles, only: %i[show]
      resources :categories, only: %i[index]
    end
    resource :session, only: %i[create destroy]
    resources :redirections, except: %i[new show edit]
    resources :organizations, except: %i[new edit], param: :id
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
