class AddIndexToTeamMembers < ActiveRecord::Migration[6.1]
  def change
    add_index :team_members, [:user_id, :project_id], unique: true
  end
end
