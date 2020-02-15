class StageSerializer < ActiveModel::Serializer
  attributes :id, :name, :seed, :small, :large
end
