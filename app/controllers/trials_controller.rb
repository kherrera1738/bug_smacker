class TrialsController < ApplicationController
  before_action :set_trial_mode
  skip_before_action :verify_authenticity_token 
  
  # Organization Actions

  # GET /trials/organization
  def org_dashboard
    respond_to do |format|
      format.html { @organization = Organization.first }
      format.json { render json: Organization.first }
    end
  end

  # GET /trials/edit_organization
  def edit_org
    @organization = Organization.first
    render 'organizations/edit'
  end

  # Role Management Actions

  # GET /trails/manage_roles
  def manage_roles
    @user = User.first
    @organization = Organization.first
  end 

  # GET /trials/manage_roles/content
  def manage_roles_content
    render json: Organization.first.positions
  end

  # POST /trials/positions
  def create_position
    user = User.find_by(id: params[:filled_by_id])
    render json: {
      name: user.name,
      role: params[:role]
    }
  end

  # Project Actions 

  # GET trials/project/1
  def project_dashboard
    @user = User.first
    @project = Organization.first.projects.find_by(id: params[:id])
  end

  # GET trials/project/content/1
  def project_content
    render json: Organization.first.projects.find_by(id: params[:id])
  end

  # GET trials/project/1/add_ticket
  def add_ticket
    @project = Organization.first.projects.find_by(id: params[:id])
    @ticket = Ticket.new
    render 'projects/add_ticket'
  end

  # GET trials/edit_project/1
  def edit_proj
    @project = Organization.first.projects.find_by(id: params[:id])
    render "projects/edit"
  end

  # Project Management Actions

  # GET trials/project/manage_team/1
  def manage_team
    @user = User.first
    @project = Organization.first.projects.find_by(id: params[:id])
  end

  # GET trials/project/manage_team/1/team_members
  def index_team_members
    render json: Organization.first.projects.find_by(id: params[:id]).team_members
  end

  # GET trials/project/manage_team/1/positions
  def index_positions
    render json: Organization.first.positions
  end

  # POST trials/team_members
  def add_team_member
    position = Organization.first.positions.find_by(filled_by_id: params[:user_id])
    render json: {
      name: position.filled_by.name,
      role: position.role
    }
  end

  # Ticket Management Actions

  # GET trials/ticket/1
  def ticket_dashboard
    @user = User.first 
    @ticket = Ticket.find_by(id: params[:id])
  end

  # GET trials/ticket/content/1
  def ticket_content
    render json: Ticket.find_by(id: params[:id])
  end

  # GET trials/ticket/1/edit
  def edit_ticket
    @ticket = Ticket.find_by(id: params[:id])
    @project = @ticket.project
    render 'tickets/edit'
  end

  # POST trials/comments
  def comments
    render json: {
      madeBy: "Trial User",
      content: params[:content],
      createdAt: Time.now.strftime("%b-%d-%Y, %I:%M %p")
    } 
  end

  private 
    def set_trial_mode
      @trial_mode = true
    end

end