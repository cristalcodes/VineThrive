class StageSerializer < ActiveModel::Serializer
  attributes :id, :seed, :small, :large
  belongs_to :plants
end
