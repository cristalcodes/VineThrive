class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :light, :water, :price
  has_many :stages 
end
