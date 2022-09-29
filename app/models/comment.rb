class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :post

    def comment_author
      self.user.username
     end

    
  
end
