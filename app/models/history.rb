class History < ApplicationRecord
  belongs_to :changed_by, class_name: "User", inverse_of: :histories
  belongs_to :ticket

  CHANGE_TYPES = ["assigned dev", "priority", "title", "description", "submitted by", "status", "ticket type" ]
  validates :changed_by, :ticket, :old_value, :new_value, :change_type, presence: true
  validates :change_type, inclusion: { in: CHANGE_TYPES, message: "Change type is not valid" }
end
