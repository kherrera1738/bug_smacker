class RegistrationsController < Devise::RegistrationsController

  def index
    render json: User.all
  end

  private
    def sign_in_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def account_update_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
    end
end
