class Message < ApplicationRecord
  has_many  :message_reply, dependent: :destroy
  has_many  :user, through: :message_reply
end
