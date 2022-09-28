class MessageSerializer < ActiveModel::Serializer
  attributes :id, :receiver, :new, :user_id
  has_many  :message_reply
end
