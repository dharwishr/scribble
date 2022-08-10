# frozen_string_literal: true

class OrganizationsController < ApplicationController
  def index
    respond_with_json(
      {
        organization_name: current_organization.name,
        is_password_enabled: current_organization.is_password_enabled?
      })
  end

  def update
    current_organization.update!(organization_params)
    respond_with_success(t("successfully_updated", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password, :is_password_enabled)
    end
end
