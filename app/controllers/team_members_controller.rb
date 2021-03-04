class TeamMembersController < ApplicationController
  before_action :set_team_member, only: [ :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [ :edit, :update, :destroy ]
  skip_before_action :verify_authenticity_token, only: [ :create ] 

  # GET /team_members/project/1
  def index_team_members
    render json: TeamMember.where(project_id: params[:id])
  end

  # GET /team_members/1/edit
  def edit
  end

  # POST /team_members or /team_members.json
  def create
    @team_member = TeamMember.new(team_member_params)
      if is_admin_or_pm? and added_user_is_part_of_organization? and @team_member.save
        render json: @team_member
      else
        render json: @team_member.errors, status: :unprocessable_entity 
      end
  end

  # PATCH/PUT /team_members/1 or /team_members/1.json
  def update
    respond_to do |format|
      if @team_member.update(team_member_params)
        render :show, status: :ok, location: @team_member
      else
        render json: @team_member.errors, status: :unprocessable_entity
      end
    end
  end

  # DELETE /team_members/1 or /team_members/1.json
  def destroy
    @team_member.destroy
    respond_to do |format|
      head :no_content 
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team_member
      @team_member = TeamMember.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def team_member_params
      params.require(:team_member).permit(:user_id, :project_id)
    end

    def is_admin_or_pm?
      @team_member.project.organization.positions.where("role=? AND filled_by_id=?", "Admin", current_user.id).exists? or
      (@team_member.project.organization.positions.where("role=? AND filled_by_id=?", "PM", current_user.id).exists? and 
      @team_member.project.team_members.where(user_id: current_user.id).exists?)
    end

    def added_user_is_part_of_organization?
      @team_member.project.organization.positions.where(filled_by_id: params[:team_member][:user_id]).exists?
    end
end
