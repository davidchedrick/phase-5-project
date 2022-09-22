class ChatReply < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  def message_author
    self.user.username
  end
end
