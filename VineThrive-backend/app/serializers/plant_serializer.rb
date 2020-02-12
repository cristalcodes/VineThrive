class PlantSerializer < ActiveModel::Serializer
  attributes :id, :description, :light, :water, :price
  # belongs_to :stages 
end
