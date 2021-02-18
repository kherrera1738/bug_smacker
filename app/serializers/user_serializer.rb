class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :positions, :projects
  
  def positions
    positions = [] 
    object.positions.each do |position|
      positions.push({
        role: position.role,
        organization: position.organization.name,
        url: organization_dashboard_path(position.organization.id),
        owned: (position.organization.owner == object)
      })
    end
    return positions
  end

  def projects
    projects = []
    object.projects.each do |project|
      projects.push({
        name: project.name,
        organization: project.organization.name,
        url: project_dashboard_path(project.id)
      })
    end
    return projects
  end
end
