function PostsArea({ handleLogout, posts }) {
    return (
        <div>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
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
