# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug
    resources :categories, except: %i[new edit], param: :id
    resources :users, only: %i[create index]
    resources :eui, except: %i[new edit], param: :id
    resource :session, only: [:create, :destroy]
    resources :redirections, except: %i[new show edit]
    resources :settings, except: %i[new edit], param: :id
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
