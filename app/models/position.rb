class Position < ApplicationRecord


  belongs_to :filled_by, class_name: "User"
  belongs_to :organization

  ROLES = %w{ Admin PM Dev Submitter }
  validates :role, presence: true, inclusion: { in: ROLES, message: "Role does not exist" }
  validates :filled_by, uniqueness: { scope: :organization } 
end
