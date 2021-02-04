class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :ticket, null: false, foreign_key: true
      t.references :made_by, null: false, foreign_key: { to_table: :users}
      t.text :content

      t.timestamps
    end
  end
end
