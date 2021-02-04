class Ticket < ApplicationRecord
  belongs_to :project
  belongs_to :assigned_dev, class_name: "User", inverse_of: :assigned_tickets, optional: true
  belongs_to :submitted_by, class_name: "User", inverse_of: :submitted_tickets, optional: true
  has_many :histories, dependent: :destroy
  has_many :comments, dependent: :destroy

  PRIORITIES = ["low", "medium", "high"] 
  STATUSES = ["new", "open", "in progress", "resolved", "additional information required"]
  TYPES = ["bug/errors", "feature requests", "comments", "training/document requests"]
  validates :title, :description, :project_id, :priority, :ticket_type, :status, presence: true
  validates :title, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validates :priority, inclusion: { in: PRIORITIES, message: "Priority is not valid" }
  validates :status, inclusion: { in: STATUSES, message: "Status is not valid" }
  validates :ticket_type, inclusion: { in: TYPES, message: "Type is not valid" }

  # want project id unchangable
  attr_readonly :project_id
end
