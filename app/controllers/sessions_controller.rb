# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    @user = Settings.first
    unless @user.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  def destroy
    @current_user = nil
    # any other session cleanup tasks can be done here...
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
