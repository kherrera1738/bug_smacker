class ChangePositionColumnNames < ActiveRecord::Migration[6.1]
  def change
    rename_column :positions, :user_id, :filled_by_id
  end
end
