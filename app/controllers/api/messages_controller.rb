class Api::MessagesController < ApplicationController

    
    def index
        message = Message.all
        render json: Message.all.order(created_at: :desc)
    end
  
    def show
        render json: set_message, status: :ok
    end

    def create
        message = Message.create!(message_params)
        render json: message, status: :created
    end

    def update 
        set_message.update!(message_params)
        render json: set_message, status: :accepted
    end

    def destroy
        set_message.destroy
        head :no_content
    end

private
    def set_message
       Message.find(params[:id])
    end

    def message_params 
        params.permit(:receiver, :user_id)
    end
  
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
