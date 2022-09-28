class ChangeMessageReceiverDataType < ActiveRecord::Migration[6.1]
  def change
    change_column :messages, :receiver, :string
  end
end
