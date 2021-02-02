class Organization < ApplicationRecord
  belongs_to :owner, class_name: "User", inverse_of: :owned_organizations
  has_many :positions, dependent: :destroy
  has_many :projects, dependent: :destroy  

  validates :name, presence: true, length: { maximum: 100 }, uniqueness: true
end
