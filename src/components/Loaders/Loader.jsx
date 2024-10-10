import { DotLoader, RotateLoader } from "react-spinners";
import "./loader.scss"

const Loader = ({loading, loaderType="dot"}) => {
    
    
    if (loaderType=="rotate")return ( 
        <>
        <RotateLoader
            className="loader"
            aria-label="Loading spinner"
            loading={loading || false}
            color={"white"}
            size={"11"}

        />
        </>
    );

    if (loaderType=="dot") return (
        <DotLoader
        className="loader"
        aria-label="Loading spinner"
        loading={loading || false}
        color={"white"}
        size={25}

    />
    )
}
 
export default Loader;