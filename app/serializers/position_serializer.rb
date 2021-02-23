class PositionSerializer < ActiveModel::Serializer
  attributes :id, :role, :name

  def name
    object.filled_by.name
  end
end
