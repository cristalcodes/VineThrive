class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :light, :water, :price
  # belongs_to :stages 
end
