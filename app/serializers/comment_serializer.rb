class CommentSerializer < ActiveModel::Serializer
  attributes :content, :madeBy, :createdAt

  def madeBy
    object.made_by.name
  end

  def createdAt
    object.created_at
  end
end
