class TicketsController < ApplicationController
  before_action :set_ticket, only: [ :show, :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [ :index, :show, :edit, :update, :destroy ]

  # GET /tickets or /tickets.json
  def index
    @tickets = Ticket.all
  end

  # GET /tickets/1 or /tickets/1.json
  def show
  end

  # GET /tickets/new
  def new
    @ticket = Ticket.new
  end

  # GET /tickets/1/edit
  def edit
  end

  # POST /tickets or /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)

    respond_to do |format|
      if @ticket.save
        format.html { redirect_to @ticket, notice: "Ticket was successfully created." }
        format.json { render :show, status: :created, location: @ticket }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tickets/1 or /tickets/1.json
  def update
    respond_to do |format|
      if ok_to_edit? and @ticket.update(ticket_params)  
        format.html { redirect_to @ticket, notice: "Ticket was successfully updated." }
        format.json { render :show, status: :ok, location: @ticket }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tickets/1 or /tickets/1.json
  def destroy
    @ticket.destroy
    respond_to do |format|
      format.html { redirect_to tickets_url, notice: "Ticket was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def ticket_params
      params.require(:ticket).permit(:title, :description, :project_id, :priority, :status, :ticket_type, :assigned_dev_id)
    end

    # Check if current user is either a PM in project team or organization Admin
    def is_admin_or_pm?
      (@ticket.project.team_members.where(user_id: current_user.id).exists? and 
      @ticket.project.organization.positions.where(filled_by_id: current_user.id, role: "PM").exists?) or
      @ticket.project.organization.positions.where(filled_by_id: current_user.id, role: "Admin").exists? 
    end

    # Only allow assigned dev to be changed by PM or Admin if it is present
    def can_edit_dev? 
      (assigned_dev_id = params[:ticket][:assigned_dev_id]).nil? or (is_admin_or_pm? and is_team_member?(assigned_dev_id))
    end

    # Team members can edit status, type, or priority 
    def can_edit_stp?
      ticket_params = params[:ticket] 
      (ticket_params[:status].nil? and ticket_params[:ticket_type].nil? and ticket_params[:priority].nil?) or 
      is_team_member?(current_user.id)
    end

    # Check if non nil parameters are okay to
    def ok_to_edit?
      can_edit_dev? and can_edit_stp? and can_edit_title_or_description?
    end

    # Check if user is a project team member
    def is_team_member?(member_id)
      @ticket.project.team_members.where(user_id: member_id).exists?
    end

    def can_edit_title_or_description?
      (params[:ticket][:title].nil? and params[:ticket][:description].nil?) or is_team_member?(current_user.id) or @ticket.submitted_by == current_user 
    end
end
