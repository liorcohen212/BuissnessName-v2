import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import * as yup from "yup";
import { SiteTheme } from "../App";
import { checkUser, getTokenDetailes } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
interface LoginProps {
    setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({setUserInfo}) => {
    let navigate = useNavigate()
    let theme = useContext(SiteTheme)
    let formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8)
        }),
        onSubmit(values) {
            checkUser(values)
            .then((res) => {                   
                    sessionStorage.setItem("token", JSON.stringify({token: res.data}))
                    sessionStorage.setItem(
                        "userInfo",
                        JSON.stringify({
                        email: (getTokenDetailes() as any).email,
                        role: (getTokenDetailes() as any).role,
                        _id: (getTokenDetailes() as any)._id
                        })
                    );
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                    navigate("showbussiness");
                    successMsg(`Youre logged in as ${values.email}`);
            })
            .catch((err) => console.log(err));
        },
    });
    return (<>
    <div style={{background: theme.background}}>
    <div className="container col-md-7 pb-5">
<form onSubmit={formik.handleSubmit}>
    <h3 className="display-3 pt-5" style={{color: theme.color}}>Login</h3>
    <div className="form-floating mb-5">
    <input
        type="email"
        className="form-control"
        id="email"
        placeholder="name@example.com"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="email">Email address</label>
    {formik.touched.email && formik.errors.email && (
        <small className="text-danger">{formik.errors.email}</small>
    )}
    </div>
    <div className="form-floating mb-3 ">
    <input
        type="password"
        className="form-control"
        id="password"
        placeholder="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="password">password</label>
    {formik.touched.password && formik.errors.password && (
        <small className="text-danger">{formik.errors.password}</small>
    )}
    </div>
    <button
type="submit"
className="btn btn-success my-3 w-100 mb-5"
disabled={!formik.isValid || !formik.dirty}
>
Login
</button>
    </form>
    <Link to="/register">Dont have an account? Signup now</Link>
    </div>
    </div>
    </>);
}

export default Login;