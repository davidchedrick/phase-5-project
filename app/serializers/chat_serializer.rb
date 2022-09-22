class ChatSerializer < ActiveModel::Serializer
  attributes :id, :topic, :user_id
  has_many  :chat_reply
end
