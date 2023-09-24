import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";
import { Link } from "react-router-dom";

interface FooterProps {
   userInfo: any;
}

const Footer: FunctionComponent<FooterProps> = ({userInfo}) => {
    let theme = useContext(SiteTheme);
    return (<>
    <div style={{color: theme.color,background: theme.cardBg}}>
    <footer className="text-center text-white" style={{background: theme.cardBg}}>
<div className="container pt-5">
    <section >
    <Link
        className="btn btn-floating btn-lg text-dark"
        to="/about"
        role="button"
        ><i className="fa-solid fa-circle-exclamation"></i><p>about</p></Link>
    <Link
        className="btn btn-floating btn-lg text-dark m-0"
        to="/favoriteCards"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fa-solid fa-heart"></i><p>fav cards</p></Link>
    {userInfo.role === "isUser" ? (<></>) : (<><Link
        className="btn btn-floating btn-lg text-dark m-1"
        to="/home"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="fa-solid fa-user"></i><p>my cards</p></Link></>)}
    </section>
</div>
<div className="text-center text-dark" style={{background: theme.cardBg}}>
    © 2020 Copyright: Lior cohen
</div>
</footer>
    </div>
    </>);
}

export default Footer;