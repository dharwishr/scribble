# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    respond_with_json(
      {
        site_name: Organizations.first.name,
        is_password_enabled: Organizations.first.password_enabled
      })
  end

  def update
    Organizations.first.update!(organization_params)
    respond_with_success("successfully_updated")
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password, :password_enabled)
    end
end
