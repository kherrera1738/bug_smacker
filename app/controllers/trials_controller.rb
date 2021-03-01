class TrialsController < ApplicationController
  skip_before_action :verify_authenticity_token 
  
  # GET /trials/organization/1
  def org_dashboard
    @organization = Organization.first
  end

  # GET /trails/manage_roles
  def manage_roles
    @user = User.first
    @organization = Organization.first
  end 

  # GET /trials/manage_roles/content
  def manage_roles_content
    render json: Organization.first.positions
  end

  # GET /trials/edit_organization
  def edit_org
    @organization = Organization.first
  end

  def project_dashboard
    @user = User.first
    @project = Organization.first.projects.find_by(id: params[:id])
  end

  def project_content
    render json: Organization.first.projects.find_by(id: params[:id])
  end

  def manage_team
    @user = User.first
    @project = Organization.first.projects.find_by(id: params[:id])
  end

  def index_team_members
    render json: Organization.first.projects.find_by(id: params[:id]).team_members
  end

  def index_positions
    render json: Organization.first.positions
  end

  def add_team_member
    position = Organization.first.positions.find_by(filled_by_id: params[:user_id])
    render json: {
      name: position.filled_by.name,
      role: position.role
    }
  end

  def edit_proj
    @project = Organization.first.projects.find_by(id: params[:id])
  end

  def add_ticket
    @project = Organization.first.projects.find_by(id: params[:id])
    @ticket = Ticket.new
  end

  def ticket_dashboard
    @user = User.first 
    @ticket = Ticket.find_by(id: params[:id])
  end

  def ticket_content
    render json: Ticket.find_by(id: params[:id])
  end

  def edit_ticket
    @ticket = Ticket.find_by(id: params[:id])
  end

  def comments
    render json: {
      madeBy: "Trial User",
      content: params[:content],
      createdAt: Time.now.strftime("%b-%d-%Y, %I:%M %p")
    } 
  end

end