class ChatReplySerializer < ActiveModel::Serializer
  attributes :id, :message, :user_id, :chat_id, :message_author
end
