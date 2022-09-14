class User < ApplicationRecord
    has_many :posts, dependent: :nullify
    has_many :comments, dependent: :nullify
    has_one :profile, dependent: :destroy
    
    has_secure_password
  
    validates :username, presence: true, uniqueness: true
end