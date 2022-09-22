class Api::ChatRepliesController < ApplicationController

    def index
        chat_reply = ChatReply.all
        render json: Chat.all.order(created_at: :desc)
    end
  
    def show
        render json: set_chat_reply, status: :ok
    end

    def create
        chat_reply = ChatReply.create!(chat_reply_params)
        render json: chat_reply, status: :created
    end

    def update 
        set_chat_reply.update!(chat_reply_params)
        render json: set_chat_reply, status: :accepted
    end

    def destroy
        set_chat_reply.destroy
        head :no_content
    end

private
    def set_chat_reply
        ChatReply.find(params[:id])
    end

    def chat_reply_params 
        params.permit(:message, :user_id, :chat_id)
    end
  
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
