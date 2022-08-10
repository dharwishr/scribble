# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = Redirection.all
  end

  def create
    Redirection.create!(from: "/#{redirection_params[:from]}", to: "/#{redirection_params[:to]}")
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def update
    @redirection.update!(from: "/#{redirection_params[:from]}", to: "/#{redirection_params[:to]}")
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      @redirection = Redirection.find_by!(id: params[:id])
    end
end
