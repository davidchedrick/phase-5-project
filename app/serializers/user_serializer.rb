class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :password
    # , :profile
    # has_one :profile
end
