import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../Loading";
import Posts from "./Posts";
import { selectAllPosts, getPostsStatus } from "./postsSlice";

function PostsArea({ currentUser }) {
    const posts = useSelector(selectAllPosts);
    console.log("posts: ", posts);
    const postStatus = useSelector(getPostsStatus);

    if (postStatus === "loading") {
        return <Loading />;
    }

    return (
        <PostsDiv>
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
