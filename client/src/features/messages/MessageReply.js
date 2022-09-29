import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectMessageReplyByMessageId } from "./messageReplySlice";
import Reply from "./Reply";

const MessageReply = () => {
    const { id } = useParams();

    const messages = useSelector(state =>
        selectMessageReplyByMessageId(state, Number(id))
    );

    return (
        <>
            {messages.map(mess => (
                <Reply key={mess.id} mess={mess} />
            ))}
        </>
    );
};

export default MessageReply;
