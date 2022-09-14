class Api::CommentsController < ApplicationController

    def create
        comment = Comment.create!(comments_params)
        render json: comment, status: :created
    end

    private

    def comments_params 
        params.permit(:content, :user_id, :post_id)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
    
end
