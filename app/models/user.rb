class User < ApplicationRecord
    has_one :profile, dependent: :destroy
    
    has_many :posts, dependent: :nullify
    has_many :comments, dependent: :nullify
    

    has_many :chat_replies, dependent: :nullify
    has_many :chats, through: :chat_reply
    
    has_secure_password
  
    validates :username, presence: true, uniqueness: true
end