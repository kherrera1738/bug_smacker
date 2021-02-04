class Project < ApplicationRecord
  belongs_to :organization
  has_many :team_members, dependent: :destroy
  has_many :users, through: :project_assignments
  has_many :tickets, dependent: :destroy

  validates :name, :description, :organization, presence: true
  validates :name, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 } 

  attr_readonly :organization_id
end
