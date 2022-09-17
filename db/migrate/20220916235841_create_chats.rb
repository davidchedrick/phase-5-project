class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.string :topic
      t.boolean :active, default: true
      t.belongs_to :profile, null: false, foreign_key: true
      t.timestamps
    end
  end
end
