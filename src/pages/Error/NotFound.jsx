import { IconZoomExclamation } from "@tabler/icons-react";
import "./notFound.scss"
const NotFound = () => {
    console.log("hi")
    return (
        <div className="">
            <div className="error-404">
                <IconZoomExclamation size={100}/>
                <h1>404 Page not found</h1>
                <p>Lost in the digital wilderness? This page couldn't find its way either.</p>
            </div>
        </div>
    );
}
 
export default NotFound;