class TeamMembersController < ApplicationController
  before_action :set_team_member, only: [ :show, :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [ :show, :edit, :update, :destroy ]

  # GET /team_members or /team_members.json
  def index
    @team_members = TeamMember.all
  end

  # GET /team_members/1 or /team_members/1.json
  def show
  end

  # GET /team_members/new
  def new
    @team_member = TeamMember.new
  end

  # GET /team_members/1/edit
  def edit
  end

  # POST /team_members or /team_members.json
  def create
    @team_member = TeamMember.new(team_member_params)

    respond_to do |format|
      if is_admin_or_pm? and @team_member.save
        format.html { redirect_to @team_member, notice: "Team member was successfully created." }
        format.json { render :show, status: :created, location: @team_member }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @team_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /team_members/1 or /team_members/1.json
  def update
    respond_to do |format|
      if @team_member.update(team_member_params)
        format.html { redirect_to @team_member, notice: "Team member was successfully updated." }
        format.json { render :show, status: :ok, location: @team_member }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @team_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /team_members/1 or /team_members/1.json
  def destroy
    @team_member.destroy
    respond_to do |format|
      format.html { redirect_to team_members_url, notice: "Team member was successfully destroyed." }
      format.json { head :no_content }
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
end
