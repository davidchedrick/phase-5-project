import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../Loading";
import Posts from "./Posts";
import { selectAllPosts, getPostsStatus } from "./postsSlice";

const PostsArea = ({ currentUser, isSearching }) => {
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const handleSubmit = e => e.preventDefault();
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = e => {
        const results = posts.filter(
            post =>
                post.title.includes(e.target.value) ||
                post.content.includes(e.target.value)
        );

        setSearchResults(results);
    };

    if (postStatus === "loading") {
        return <Loading />;
    }

    return (
        <PostsDiv>
            {isSearching ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Control
                            onChange={handleSearchChange}
                            type="text"
                            placeholder="Search Posts"
                        />
                    </Form.Group>
                </Form>
            ) : null}
            <h1>Explore Posts.</h1>

            {isSearching ? (
                <div>
                    {searchResults.map(post => (
                        <Posts
                            currentUser={currentUser}
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
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
    // flex-wrap: wrap;
    height: 3000px;
    // justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // border: 2px solid;
    background-color: rgb(238, 26, 192);
`;

export default PostsArea;
