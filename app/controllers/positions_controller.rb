class PositionsController < ApplicationController
  before_action :set_position, only: %i[ show edit update destroy ]
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [ :create ] 

  # GET /positions/organization/1
  def index_org_pos
    render json: Organization.find_by(id: params[:id]).positions
  end

  # POST /positions or /positions.json
  def create
    @position = Position.new(position_params)

    if is_admin? and @position.save
      render json: @position
    else
      render json: @position.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /positions/1 or /positions/1.json
  def update
    respond_to do |format|
      if is_not_owner_or_self? and is_admin? and @position.update(position_params)
        render :show, status: :ok, location: @position
      else
        render json: @position.errors, status: :unprocessable_entity 
      end
    end
  end

  # DELETE /positions/1 or /positions/1.json
  def destroy
    @position.destroy
    respond_to do |format|
      format.html { redirect_to positions_url, notice: "Position was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_position
      @position = Position.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def position_params
      params.require(:position).permit(:role, :filled_by_id, :organization_id)
    end

    def is_not_owner_or_self?
      @position.filled_by_id != @position.organization.owner_id and @position.filled_by_id != current_user.id
    end

    def is_admin?
      @position.organization.positions.where(role: "Admin", filled_by_id: current_user.id).exists?
    end
end
