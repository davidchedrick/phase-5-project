# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(username: 'test', password: 'password')
user2 = User.create(username: 'David', password: 'love')
user3 = User.create(username: 'Bob', password: 'love')
user.posts.create(title: 'first post', content: 'cutie content!!!')
user2.posts.create(title: 'second post', content: 'love love love')