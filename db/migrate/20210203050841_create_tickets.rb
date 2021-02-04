class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.string :title
      t.text :description
      t.references :project, null: false, foreign_key: true
      t.string :priority
      t.string :status
      t.string :ticket_type

      t.timestamps
    end
  end
end
