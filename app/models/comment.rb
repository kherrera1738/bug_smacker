class Comment < ApplicationRecord
  belongs_to :ticket
  belongs_to :made_by, class_name: "User"

  validates :made_by, :ticket, :content, presence: :true
  validates :content, length: { maximum: 1000 }

  attr_readonly :made_by_id, :ticket_id
end
