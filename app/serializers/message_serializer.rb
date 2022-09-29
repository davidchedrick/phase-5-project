class MessageSerializer < ActiveModel::Serializer
  attributes :id, :receiver, :new, :user_id, :receiver_id, :sender
  has_many  :message_reply

  def receiver_id
    receiver = User.find_by(username: object.receiver)
    return receiver.id
  end
  
  def sender
    sender = User.find(object.user_id)
    return sender.username
  end

end
