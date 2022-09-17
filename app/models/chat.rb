class Chat < ApplicationRecord
    has_many  :chat_reply
    has_many  :user, through: :chat_reply
end
