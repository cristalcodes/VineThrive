class CreateStages < ActiveRecord::Migration[6.0]
  def change
    create_table :stages do |t|
      t.string :name
      t.string :seed
      t.string :small
      t.string :large

      t.integer :plant_id
      t.timestamps
    end
  end
end
