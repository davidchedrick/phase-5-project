class MessageReplySerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :message_id
end
