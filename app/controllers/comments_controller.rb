class CommentsController < ApplicationController
  before_action :set_comment, only: [ :show, :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [ :index, new, :show, :edit, :update, :destroy ]
  before_action :is_organization_member?, only: [ :show, :edit, :update, :destroy ]
  skip_before_action :verify_authenticity_token, only: [ :create ] 

  # GET /comments or /comments.json
  def index
    @comments = Comment.all
  end

  # GET /comments/1 or /comments/1.json
  def show
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments or /comments.json
  def create
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if is_team_member? and @comment.save
        format.html { redirect_to @comment, notice: "Comment was successfully created." }
        format.json { render json: @comment }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
    # render json: @comment 
  end

  # PATCH/PUT /comments/1 or /comments/1.json
  def update
    respond_to do |format|
      if is_team_member? and is_commenter? and @comment.update(comment_params)
        format.html { redirect_to @comment, notice: "Comment was successfully updated." }
        format.json { render :show, status: :ok, location: @comment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1 or /comments/1.json
  def destroy
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to comments_url, notice: "Comment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:ticket_id, :made_by_id, :content)
    end

    def is_team_member?
      @comment.ticket.project.team_members.where(user_id: current_user.id).exists?
    end

    def is_organization_member?
      redirect_to root_url unless @comment.ticket.project.organization.positions.where(filled_by_id: current_user.id).exists?
    end

    def is_commenter?
      @comment.made_by == current_user
    end
end
