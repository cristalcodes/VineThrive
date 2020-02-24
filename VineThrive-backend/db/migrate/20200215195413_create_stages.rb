class CreateStages < ActiveRecord::Migration[6.0]
  def change
    create_table :stages do |t|
      t.string :name 
      t.boolean :reached
      t.string :notes 
      t.integer :plant_id
      t.timestamps
    end
  end
end
