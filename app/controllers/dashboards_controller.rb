class DashboardsController < ApplicationController
  before_action :authenticate_user!, only: [ :index ]
  before_action :set_user, only: [:main_content]
  
  def index
  end

  def main_content
    # render json: @user.as_json({only: :name, 
    #                             include: { positions: { only: [:role], 
    #                                                     include: { organization: { only: :name }}},
    #                                       projects: { only: :name,
    #                                                   include: { organization: { only: :name }}
    #                                                   }
    #                                       }
    #                             })

    # options = {}
    # options[:include] = [:positions, :'positions.role']

    # render json: json_string = UserSerializer.new(@user, options).serializable_hash.to_json
    # render json: json_string = PositionSerializer.new(Position.first).serializable_hash.to_json
    render json: @user
  end

  private
    def set_user
      @user = User.find_by(params[:id])
    end
end
