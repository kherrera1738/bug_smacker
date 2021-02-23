class TeamMemberSerializer < ActiveModel::Serializer
  attributes :name, :role

  def name
    object.user.name
  end

  def role
    object.project.organization.positions.find_by(filled_by_id: object.user_id).role
  end
end
