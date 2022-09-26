class Api::ChatsController < ApplicationController


    def index
        chat = Chat.all
        render json: Chat.all.order(created_at: :desc)
    end
  
    def show
        render json: set_chat, status: :ok
    end

    def create
        chat = Chat.create!(chat_params)
        render json: chat, status: :created
    end

    def update 
        set_chat.update!(chat_params)
        render json: set_chat, status: :accepted
    end

    def destroy
        set_chat.destroy
        head :no_content
    end

private
    def set_chat 
       Chat.find(params[:id])
    end

    def chat_params 
        params.permit(:topic, :user_id)
    end
  
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
