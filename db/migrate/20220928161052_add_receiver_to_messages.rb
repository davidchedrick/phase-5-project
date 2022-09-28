class AddReceiverToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :receiver, :bigint
    add_column :messages, :new, :boolean, default: true
  end
end
