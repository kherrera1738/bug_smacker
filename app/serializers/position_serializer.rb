class PositionSerializer < ActiveModel::Serializer
  attributes :id, :role, :name, :uid

  def name
    object.filled_by.name
  end

  def uid
    object.filled_by_id
  end
end
