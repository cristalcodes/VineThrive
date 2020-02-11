class CreatePlants < ActiveRecord::Migration[6.0]
  def change
    create_table :plants do |t|
      t.string :name
      t.string :description
      t.integer :price
      t.string :light
      t.string :water
      t.integer :category_id

      t.timestamps
    end
  end
end
