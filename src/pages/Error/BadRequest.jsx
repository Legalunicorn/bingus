import { IconZoomExclamation } from "@tabler/icons-react";
import "./notFound.scss"
const BadRequest = () => {
    return (
        <div className="">
            <div className="error-404">
                <IconZoomExclamation size={100}/>
                <h1>400 Bad request</h1>
                <p>Oops..something went wrong. </p>
            </div>
        </div>
    );
}
 
export default BadRequest;