class CommentSerializer < ActiveModel::Serializer
  attributes :content, :madeBy, :createdAt

  def madeBy
    object.made_by.name
  end

  def createdAt
    object.created_at.strftime("%b-%d-%Y, %I:%M %p")
  end
end
