# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
# movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])

# Character.create(name: 'Luke', movie: movies.first)

plant = Plant.create(name: "Chinese Evergreen", description: "beautiful", price: 22, light: "low", water: "high")
plant = Plant.create(name: "ZZ Plant", description: "perfect fot anyroom", price: 42, light: "medium", water: "high")
plant = Plant.create(name: "Marble Pathos", description: "great in anyroom", price: 12, light: "low", water: "low")

Stage.create(name: "seed", reached: true, notes: "beautiful", plant_id: 1 )
Stage.create(name: "small", reached: false, notes: "beautiful 2", plant_id: 2 )
Stage.create(name: "large", reached: true, notes: "beautiful 3", plant_id: 3 )

