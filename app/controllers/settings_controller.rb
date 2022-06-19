# frozen_string_literal: true

class SettingsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  before_action :load_setting!
  def index
    respond_with_json({ site_name: @setting.name, is_password_enabled: @setting.password_enabled })
  end

  def update
    setting = Settings.first
    setting.update!(setting_params)
    respond_with_success("successfully_updated")
  end

  private

    def setting_params
      params.require(:setting).permit(:name, :password, :password_enabled)
    end

    def load_setting!
      @setting = Settings.first
    end
end
