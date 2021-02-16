class PositionSerializer < ActiveModel::Serializer
  attributes :id, :role
  # belongs_to :organization
end
