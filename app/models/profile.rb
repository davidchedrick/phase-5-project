class Profile < ApplicationRecord
    belongs_to :user
    has_many :posts, through: :user

    validates :user_id, presence: true, uniqueness: true

    def user_posts
        user.posts
    end
end
