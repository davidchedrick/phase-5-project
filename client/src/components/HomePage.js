function HomePage({ posts, handleLogout }) {
    return (
        <>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
            <h1>cat!!</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </>
    );
}

export default HomePage;
