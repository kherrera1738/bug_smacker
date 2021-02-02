class PositionsController < ApplicationController
  before_action :set_position, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /positions or /positions.json
  def index
    @positions = Position.all
  end

  # GET /positions/1 or /positions/1.json
  def show
  end

  # GET /positions/new
  def new
    @position = Position.new
  end

  # GET /positions/1/edit
  def edit
  end

  # POST /positions or /positions.json
  def create
    @position = Position.new(position_params)

    respond_to do |format|
      if is_admin? and @position.save
        format.html { redirect_to @position, notice: "Position was successfully created." }
        format.json { render :show, status: :created, location: @position }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @position.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /positions/1 or /positions/1.json
  def update
    respond_to do |format|
      if is_not_owner_or_self? and is_admin? and @position.update(position_params)
        format.html { redirect_to @position, notice: "Position was successfully updated." }
        format.json { render :show, status: :ok, location: @position }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @position.errors, status: :unprocessable_entity }
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
