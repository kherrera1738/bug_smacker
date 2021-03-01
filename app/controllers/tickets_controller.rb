class TicketsController < ApplicationController
  before_action :set_ticket, only: [ :show, :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [ :index, :show, :edit, :update, :destroy ]

  # GET /tickets or /tickets.json
  def index
    @tickets = Ticket.all
  end

  # GET /tickets/1 or /tickets/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render json: @ticket}
    end
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
        format.html { redirect_to ticket_dashboard_path(@ticket), notice: "Ticket was successfully created." }
        format.json { render :show, status: :created, location: @ticket }
      else
        flash[:alert] = "Ticket could not be created."
        format.html { redirect_to project_dashboard_path(params[:ticket][:project_id]) }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tickets/1 or /tickets/1.json
  def update
    respond_to do |format|
      old_value, new_value, change_type, val = find_changes
      if ok_to_edit? and @ticket.update_attribute(val.to_s, new_value)  
        old_value ||= "nil" 
        new_value ||= "nil"
        @ticket.histories.create(changed_by_id: current_user.id, old_value: old_value, new_value: new_value, change_type: change_type)
        format.html { redirect_to ticket_dashboard_path(@ticket.id), notice: "Ticket was successfully updated." }
        format.json { render :show, status: :ok, location: @ticket }
      else
        flash[:alert] = "Could not update ticket."
        format.html { redirect_to ticket_dashboard_path(@ticket.id) }
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
      can_edit_dev? and can_edit_stp? and can_edit_title_or_description? and not_all_blank?
    end

    # Check if user is a project team member
    def is_team_member?(member_id)
      @ticket.project.team_members.where(user_id: member_id).exists?
    end

    def can_edit_title_or_description?
      (params[:ticket][:title].nil? and params[:ticket][:description].nil?) or is_team_member?(current_user.id) or @ticket.submitted_by == current_user 
    end

    def not_all_blank?
      params[:ticket].keys.each do |key|
        if key != "project_id" and !params[:ticket][key].blank?
          return true
        end
      end
      return false
    end

    def find_changes
      ticket_params = params[:ticket]
      if !ticket_params[:assigned_dev_id].blank?
        change_type = "assigned dev"
        val = :assigned_dev_id
      elsif !ticket_params[:submitted_by_id].blank?
        change_type = "submitted by"
        val = :submitted_by_id
      elsif !ticket_params[:priority].blank?
        change_type = "priority"
        val = :priority
      elsif !ticket_params[:ticket_type].blank?
        change_type = "ticket type"
        val = :ticket_type
      elsif !ticket_params[:status].blank?
        change_type = "status"
        val = :status
      elsif !ticket_params[:title].blank?
        change_type = "title"
        val = :title
      else
        change_type = "description"
        val = :description
      end

      old_value = @ticket.send(val)
      new_value = ticket_params[val]
      return [old_value, new_value, change_type.to_s, val]
    end
end
