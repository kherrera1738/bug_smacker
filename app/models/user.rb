class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :owned_organizations, dependent: :destroy, class_name: "Organization", foreign_key: "owner_id"
  has_many :positions, dependent: :destroy, foreign_key: "filled_by_id"
  has_many :team_members, dependent: :destroy
  has_many :projects, through: :team_members
  has_many :assigned_tickets, class_name: "Ticket", foreign_key: "assigned_dev_id", dependent: :nullify
  has_many :submitted_tickets, class_name: "Ticket", foreign_key: "submitted_by_id", dependent: :nullify 
  has_many :histories, dependent: :nullify, foreign_key: "changed_by_id"
  has_many :comments, dependent: :destroy, foreign_key: "made_by_id"

  validates :name, presence: true, length: { maximum: 100 }
end
