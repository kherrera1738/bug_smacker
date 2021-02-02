class RemoveIndexFromPositions < ActiveRecord::Migration[6.1]
  def change
    remove_index :positions, name: "index_positions_on_filled_by_and_organization"
  end
end
