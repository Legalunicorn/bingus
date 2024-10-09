import { format } from "date-fns";
import "./textBubble.scss"

const TextBubble = ({message}) => {

    const formattedDate = format(message.createdAt,"h:mm aaa")

    return (
        <div className={message.fromUser?"bubble right":"bubble left"}>
            <p>{message.content}</p>
            <p className="time">{formattedDate}</p>
        </div>
    );
}
 
export default TextBubble;

//format:   h:m aaaa