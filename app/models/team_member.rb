class TeamMember < ApplicationRecord
  belongs_to :user
  belongs_to :project

  attr_readonly :user_id, :project_id 

  def user_name
    self.user.name
  end
end
