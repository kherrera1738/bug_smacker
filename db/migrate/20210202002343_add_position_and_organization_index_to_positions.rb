class AddPositionAndOrganizationIndexToPositions < ActiveRecord::Migration[6.1]
  def change
    add_index :positions, [:filled_by_id, :organization_id], unique: true
  end
end
