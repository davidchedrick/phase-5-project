class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user_id, :date, :author, :short_content, :user, :profile, :comments 
  has_many :comments
end
