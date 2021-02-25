class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: [:index, :show]
  skip_before_action :verify_authenticity_token, only: [ :create ] 

  # GET /organizations or /organizations.json
  def index
    @organizations = Organization.all
  end

  # GET /organizations/1 or /organizations/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render json: @organization}
    end
  end

  # GET /organizations/new
  def new
    @organization = Organization.new
  end

  # GET /organizations/1/edit
  def edit
  end

  # POST /organizations or /organizations.json
  def create
    @organization = Organization.new(organization_params)

    respond_to do |format|
      if @organization.save
        
        # Create an admin role for the owner
        @position = @organization.positions.create(filled_by_id: @organization.owner_id, role: 'Admin')
        format.html { redirect_to @organization, notice: "Organization was successfully created." }
        format.json { render json: {
          organization: @organization.name,
          role: @position.role,
          owned: "True",
          url: organization_dashboard_path(@organization.id)
        } }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /organizations/1 or /organizations/1.json
  def update
    respond_to do |format|
      if @organization.update(organization_params)
        format.html { redirect_to organization_dashboard_path(@organization.id), notice: "Organization was successfully updated." }
        format.json { render :show, status: :ok, location: @organization }
      else
        flash[:alert] = "Organization could not be updated"
        format.html { redirect_to organization_dashboard_path(@organization.id) }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /organizations/1 or /organizations/1.json
  def destroy
    @organization.destroy
    respond_to do |format|
      format.html { redirect_to organizations_url, notice: "Organization was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.require(:organization).permit(:name, :owner_id)
    end
end
