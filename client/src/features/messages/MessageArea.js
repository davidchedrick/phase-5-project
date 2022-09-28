import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { useEffect } from "react";

const MessageArea = ({ currentUser, setFetchUser }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const state = useSelector(state => selectMessagesById(state, Number(id)));
    // const messages = state.messages;
    // console.log("messages: ", messages);
    // const status = state.status;
    // const error = state.error;

    useEffect(() => {
        // dispatch(fetchMessages(id));
    }, [dispatch, id]);

    // if (status === "pending" || error || messages === null) return <Loading />;

    return (
        <div>MessageArea</div>
        // <div>{status}</div>
    );
};

export default MessageArea;
