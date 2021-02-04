class RemoveForeignKeyFromTicket < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :tickets, :users, column: :assigned_dev_id
    remove_foreign_key :tickets, :users, column: :submitted_by_id
  end
end
