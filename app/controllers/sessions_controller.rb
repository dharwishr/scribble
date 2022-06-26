# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    @organization = Organizations.first
    unless @organization.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  private

    def login_params
      params.permit(:password)
    end
end
