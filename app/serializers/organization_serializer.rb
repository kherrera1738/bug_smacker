class OrganizationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :show_url

  def show_url
    { 
    show: organization_path(object.id),
    edit: object.id
    }
  end
end
