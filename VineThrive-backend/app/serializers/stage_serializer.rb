class StageSerializer < ActiveModel::Serializer
  attributes :id, :name, :reached. :notes, :plant_id
  belongs_to :plant
end
 