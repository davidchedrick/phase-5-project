import { useSelector } from "react-redux";
import styled from "styled-components";
import Posts from "./Posts";

function PostsArea({ currentUser }) {
    const posts = useSelector(state => state.posts.posts);
    console.log("posts: ", posts);

    return (
        <PostsDiv>
            {/* {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))} */}

            {posts.length === 0 ? (
                <h1 className="position-absolute top-50 start-50 translate-middle">
                    Add First Post!
                </h1>
            ) : (
                <div>
                    {posts.map(post => (
                        <Posts
                            currentUser={currentUser}
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </PostsDiv>
    );
}

const PostsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(10, 210, 115, 0.5);
`;

export default PostsArea;
