class StageSerializer < ActiveModel::Serializer
  attributes :id, :seed, :small, :large 
  belong_to :plant 
end
