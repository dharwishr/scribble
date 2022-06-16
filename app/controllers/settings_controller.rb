# frozen_string_literal: true

class SettingsController < ApplicationController
  before_action :load_setting!, only: %i[update destroy]
  def index
    @settings = Settings.all
  end

  def update
    setting = Settings.find_by!(id: params[:id])
    setting.update!(setting_params)
    respond_with_success("successfully_updated")
  end

  private

    def setting_params
      params.require(:setting).permit(:id, :name, :password)
    end

    def load_setting!
      @setting = Settings.find_by!(id: params[:id])
    end
end
