class CreateMessageReplies < ActiveRecord::Migration[6.1]
  def change
    create_table :message_replies do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :message, null: false, foreign_key: true

      t.timestamps
    end
  end
end
