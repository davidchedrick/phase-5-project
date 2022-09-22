const ChatMessages = ({ message }) => {
    console.log("message: ", message);
    return (
        <div className="chat-message mt-2 ">
            <strong className="m-2">{message.message_author}:</strong>

            <p className="m-2">{message.message}</p>
        </div>
    );
};

export default ChatMessages;
