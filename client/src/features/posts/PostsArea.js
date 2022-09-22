import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../Loading";
import Posts from "./Posts";
import { selectAllPosts, getPostsStatus } from "./postsSlice";

const PostsArea = ({ currentUser }) => {
    const posts = useSelector(selectAllPosts);
    console.log("posts: ", posts);
    const postStatus = useSelector(getPostsStatus);

    if (postStatus === "loading") {
        return <Loading />;
    }

    return (
        <PostsDiv>
            <h1>Explore Posts.</h1>

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
};

const PostsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 100%;
    border: 2px solid;
    box-shadow: 5px 3px 40px rgba(0, 0, 0, 0.75),
        -5px -3px 40px rgba(0, 0, 0, 0.75);
    background-color: rgb(238, 26, 192);
`;

export default PostsArea;
