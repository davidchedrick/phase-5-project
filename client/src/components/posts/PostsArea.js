import { useSelector } from "react-redux";

function PostsArea() {
    const posts = useSelector(state => state.posts.posts);
    console.log("posts: ", posts);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default PostsArea;
