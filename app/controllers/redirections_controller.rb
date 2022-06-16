# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = Redirections.all
  end

  def create
    redirection = Redirections.new(redirection_params)
    redirection.save!
    respond_with_success("successfully_created")
  end

  def destroy
    @redirection.destroy!
    respond_with_json
  end

  def update
    redirection = Redirections.find_by!(id: params[:id])
    redirection.update!(redirection_params)
    respond_with_success("successfully_updated")
  end

  private

    def redirection_params
      params.require(:redirection).permit(:id, :from, :to)
    end

    def load_redirection!
      @redirection = Redirections.find_by!(id: params[:id])
    end
end
