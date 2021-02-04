class CreateHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :histories do |t|
      t.string :change_type
      t.string :old_value
      t.string :new_value
      t.references :changed_by, null: true 
      t.references :ticket, null: false, foreign_key: true

      t.timestamps
    end
  end
end
