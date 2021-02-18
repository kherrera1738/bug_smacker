class DashboardsController < ApplicationController
  before_action :authenticate_user!, only: [ :index ]
  before_action :set_user, only: [:main_content]
  
  def index
  end

  def main_content
    render json: @user
  end

  def org_dashboard
    @organization = Organization.find_by(id: params[:org_id])
  end

  def project_dashboard
    @project = Project.find_by(id: params[:proj_id])
  end

  private
    def set_user
      @user = User.find_by(id: params[:id])
    end
end
