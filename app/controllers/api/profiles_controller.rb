class Api::ProfilesController < ApplicationController

    def index
      
        profile = Profile.all
        render json: profile
    end
    
    def show
       
        profile = Profile.find(params[:id]) 
        render json: profile, status: :ok
    end

    def update 
        profile = Profile.find(params[:id])
        profile.update(profile_params)
        render json: profile, status: :accepted
    end

    private

    def profile_params 
        params.permit(:name, :bio, :website, :picture)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
    
end
