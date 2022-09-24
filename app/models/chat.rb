class Chat < ApplicationRecord
    has_many  :chat_reply, dependent: :destroy
    has_many  :user, through: :chat_reply
end
