class ProjectsController < ApplicationController
  before_action :set_project, only: [ :show, :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [ :edit, :update, :destroy ]
  before_action :is_part_of_organization?, only: [ :show, :edit, :update, :destroy ]
  skip_before_action :verify_authenticity_token, only: [ :create ] 

  # GET /projects or /projects.json
  def index
    @projects = Project.all
  end

  # GET /projects/1 or /projects/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render json: @project}
    end
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects or /projects.json
  def create
    @project = Project.new(project_params)

    respond_to do |format|
      if is_organization_admin? and @project.save
        format.html { redirect_to @project, notice: "Project was successfully created." }
        format.json { render json: {
          name: @project.name,
          organization: @project.organization.name,
          url: project_dashboard_path(@project.id)
        } }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    respond_to do |format|
      if (is_organization_admin? or is_project_pm?) and @project.update(project_params)
        format.html { redirect_to @project, notice: "Project was successfully updated." }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to projects_url, notice: "Project was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.require(:project).permit(:name, :description, :organization_id)
    end

    def is_part_of_organization?
      redirect_to(root_url, alert: "You are not part of this organization") unless @project.organization.positions.where(filled_by_id: current_user.id).exists?
    end

    def is_organization_admin?
      @project.organization.positions.where(role: "Admin", filled_by_id: current_user.id).exists?
    end

    def is_project_pm?
      @project.team_members.where(user_id: current_user.id).exists? and @project.organization.positions.where(role: "PM", filled_by_id: current_user).exists?
    end
end
