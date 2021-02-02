class AddIndexToPositions < ActiveRecord::Migration[6.1]
  def change
    add_index :positions, [:filled_by, :organization], unique: true
  end
end
