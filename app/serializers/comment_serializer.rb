class CommentSerializer < ActiveModel::Serializer
    attributes :id, :name, :bio, :website, :picture, :user_posts
end
