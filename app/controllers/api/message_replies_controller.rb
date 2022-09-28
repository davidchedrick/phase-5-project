class Api::MessageRepliesController < ApplicationController

    def index
        message_reply = MessageReply.all
        render json: message_reply.order(created_at: :desc)
    end
  
    def show
        render json: set_message_reply, status: :ok
    end

    def create
        message_reply = MessageReply.create!(message_reply_params)
        render json: message_reply, status: :created
    end

    def update 
        set_message_reply.update!(message_reply_params)
        render json: set_message_reply, status: :accepted
    end

    def destroy
        set_message_reply.destroy
        head :no_content
    end

private
    def set_message_reply
        MessageReply.find(params[:id])
    end

    def message_reply_params 
        params.permit(:body, :user_id, :message_id)
    end
  
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
