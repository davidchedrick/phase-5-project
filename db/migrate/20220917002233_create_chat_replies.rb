class CreateChatReplies < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_replies do |t|
      t.string :message
      t.belongs_to :chat, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
