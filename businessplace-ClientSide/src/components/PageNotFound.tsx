import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps {
    
}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    let theme = useContext(SiteTheme);
    let navigate = useNavigate();
    return (<>
    <div style={{color: theme.color, background: theme.background}}>
    <h1 className="display-1">404</h1>
    <h4 className="display-4">Page Not Found</h4>
    <button className="btn mb-5" style={{background: theme.buttonbg}} onClick={() => navigate(-1)}>
        Back
    </button>
    </div>
    </>  );
}

export default PageNotFound;