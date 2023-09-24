import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
    userInfo: any;
    setUserInfo: Function;
    darkMode: boolean;
    setDarkMode: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({userInfo, setUserInfo, darkMode, setDarkMode}) => {
    let theme = useContext(SiteTheme)
    let navigate = useNavigate()
    let roles = (userInfo.role === "isBussiness" || userInfo.role === "isAdmin" || userInfo.role === "isUser");
    let logout = () => {
        sessionStorage.removeItem("userInfo");
        setUserInfo({ email: false, role: "defaultUser" });
        navigate("");
    };
    return (<>
        <div style={{color: theme.color, background: theme.Navbarbg}}>
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
    <NavLink className="navbar-brand" to="/showbussiness">Bcard</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/about">About</NavLink>
        </li>
        {roles && (<>
        <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/favoriteCards">Fav Cards</NavLink>
        </li>
</>)}
        {userInfo.role === "isBussiness" && (<>
        <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/my-cards">My Cards</NavLink>
        </li>
</>)}
        {userInfo.role === "isAdmin" && (<>
            <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/my-cards">My Cards</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/sandbox">SandBox</NavLink>
        </li>
</>)}
    </ul>
    <form className="d-flex">
                <div className="container">
                    <div className="row justify-content-center mt-1">
                        <div className="col-md-12">
                            <div className=" row search-bar">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                />
                    </div>
                    </div>
                </div>
                </div>
                <div className="form-check form-switch"
                style={{marginLeft: 10}}>
                <input
                    className="form-check-input mt-3"

                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() => {
                    setDarkMode(!darkMode);
                    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
                    }}
                    checked={JSON.parse(localStorage.getItem("darkMode")!)}
                />
                <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                ></label>
                </div>
    </form>
    {roles ? (<><img src="userImg.jpg" className="rounded-circle profileImg" width="50" alt="userImg" onClick={() => navigate(`updateUser/${userInfo._id}`)}/>
    <button className="btn" onClick={logout} style={{ background: theme.buttonbg }}>Logout</button></>) : (<><button className="btn btn-primary" onClick={() => navigate("")} style={{background: theme.buttonbg}}>Login</button>
    <button className="btn btn-primary" onClick={() => navigate("register")} style={{background: theme.buttonbg}}>Signup</button></>)}
    </div>
</div>
</nav>

</div>
</>)}

export default Navbar;