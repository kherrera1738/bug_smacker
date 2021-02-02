class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :owned_organizations, dependent: :destroy, class_name: "Organization", foreign_key: "owner_id"
  has_many :positions, through: :owned_organizations

  validates :name, presence: true, length: { maximum: 100 }
end
