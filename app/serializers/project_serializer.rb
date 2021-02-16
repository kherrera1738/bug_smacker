class ProjectSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :show_url
  
  def show_url
    project_path(object.id)
  end
end
