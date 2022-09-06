class Api::PostsController < ApplicationController

    def index
      post = Post.all
      render json: Post.all.order(created_at: :desc)
    end

    def show
        render json: set_post, status: :ok
    end

    def create
        post = Post.create!(post_params)
        render json: post, status: :created
    end

    def update 
        set_post.update!(post_params)
        render json: set_post, status: :accepted
    end

    def destroy
        set_post.destroy
        head :no_content
    end

    private
    def set_post 
      Post.find(params[:id])
    end

    def post_params 
        params.permit(:title, :content, :user_id)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end