class TicketsController < ApplicationController
  before_action :set_ticket, only: [:show, :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [ :show, :edit, :update, :destroy ]

  # GET /tickets/1 or /tickets/1.json
  def show
    render json: @ticket
  end

  # GET /tickets/1/edit
  def edit
    @ticket = Ticket.find_by(id: params[:id])
    @project = @ticket.project
  end

  # POST /tickets or /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)
    @ticket.submitted_by = current_user
    if @ticket.save
      redirect_to ticket_dashboard_path(@ticket), notice: "Ticket was successfully created."
    else
      flash[:alert] = "Ticket could not be created."
      redirect_to project_dashboard_path(params[:ticket][:project_id])
    end
  end

  # PATCH/PUT /tickets/1 or /tickets/1.json
  def update
      find_changes
      
      # Prevent assigned dev from being empty string on update
      if params[:ticket][:assigned_dev_id].blank?
        params[:ticket][:assigned_dev_id] = nil
      end
      
      if ok_to_edit? and save_histories and @ticket.update(ticket_params) 
        redirect_to ticket_dashboard_path(@ticket.id), notice: "Ticket was successfully updated."
      else
        flash[:alert] = "Could not update ticket."
        redirect_to ticket_dashboard_path(@ticket.id)
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
      (assigned_dev_id = params[:ticket][:assigned_dev_id]).blank? or (is_admin_or_pm? and is_team_member?(assigned_dev_id))
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
      change_types = {
        assigned_dev_id: "assigned dev",
        priority: "priority",
        ticket_type: "ticket type",
        status: "status",
        title: "title",
        description: "description"
      }

      @histories = []

      ticket_params.each do | param, value |
        if !value.blank? and @ticket.send(param).to_s != value

          if param == "assigned_dev_id"
            new_value = User.find_by(id: value).name
            old_value = @ticket.send(param) && User.find_by(id: @ticket.send(param)).name 
          end

          new_value ||= value || "None"
          old_value ||= @ticket.send(param) || "None"

          @histories.push(@ticket.histories.build(changed_by_id: current_user.id, 
                                    old_value: old_value, 
                                    new_value: new_value, 
                                    change_type: change_types[param.to_sym]))
        end
      end
    end

    def save_histories
      @histories.each do |h|
        if !h.save
          p h.errors
          return false
        end
      end
      return true
    end
end
