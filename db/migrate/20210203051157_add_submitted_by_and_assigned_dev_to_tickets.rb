class AddSubmittedByAndAssignedDevToTickets < ActiveRecord::Migration[6.1]
  def change
    add_reference :tickets, :submitted_by, null: true, foreign_key: { to_table: :users }
    add_reference :tickets, :assigned_dev, null: true, foreign_key: { to_table: :users }
  end
end
