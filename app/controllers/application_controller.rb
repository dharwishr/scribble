# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include Pundit::Authorization
  before_action :current_organization

  private

    def current_organization
      @_current_organization ||= Organization.first
    end
end
