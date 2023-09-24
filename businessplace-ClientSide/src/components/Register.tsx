import { FunctionComponent, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { SiteTheme } from "../App";
import { addUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
    setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({setUserInfo}) => {
    let navigate = useNavigate()
    let theme = useContext(SiteTheme)
    let formik = useFormik({
        initialValues: {firstname: "", middlename: "", lastname: "", phone: "", email:"", password: "", state:"", country:"",city:"",street:"",housenumber: 0, zip: 0, role: 'isUser'},
        validationSchema: yup.object({
            firstname: yup.string().required().min(2),
            lastname: yup.string().required().min(2),
            phone: yup.string().required().min(9),
            email: yup.string().required().email(),
            password: yup.string().required().min(8).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%#^*?&]{8,}$/, "Password must contain at least 1 uppercase letter, lowercase letter, digit and special character (@$!%*?&#^)"),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            housenumber: yup.number().required().min(1),
        }),
        onSubmit(values) {
            addUser(values)
            .then((res) => {
                navigate("/");
                successMsg("user registered successfully")
            })
            .catch((err) => {console.log(err)
            errorMsg("the registration waas denied")
            });
        },
});
    return (<>
        <div style={{background: theme.background}}>
    <div className="container col-md-7">
<form onSubmit={formik.handleSubmit}>
    <h3 className="display-3" style={{color: theme.color}}>REGISTER</h3>
    <div className="row">
        <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="firstname"
        placeholder="firstname"
        name="firstname"
        value={formik.values.firstname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="firstname">firstname</label>
    {formik.touched.firstname && formik.errors.firstname && (
        <small className="text-danger">{formik.errors.firstname}</small>
    )}
    </div>
<div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="middlename"
        placeholder="middlename"
    />
    <label htmlFor="middlename">middle name</label>
    </div></div>
    <div className="row">
        <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="lastname"
        placeholder="lastname"
        name="lastname"
        value={formik.values.lastname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="lastname">last name</label>
    {formik.touched.lastname && formik.errors.lastname && (
        <small className="text-danger">{formik.errors.lastname}</small>
    )}
    </div>
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="phone"
        placeholder="phone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="phone">phone</label>
    {formik.touched.phone && formik.errors.phone && (
        <small className="text-danger">{formik.errors.phone}</small>
    )}
    </div></div>
    <div className="row"> 
    <div className="form-floating mb-3 col-md-6">
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
    <div className="form-floating mb-3 col-md-6">
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
    </div></div>
    <div className="row">
        <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="state"
        placeholder="state"
    />
    <label htmlFor="state">state</label>
    </div>
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="country"
        placeholder="country"
        name="country"
        value={formik.values.country}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="country">Country</label>
    {formik.touched.country && formik.errors.country && (
        <small className="text-danger">{formik.errors.country}</small>
    )}
    </div></div>
    <div className="row">
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="city"
        placeholder="city"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="city">city</label>
    {formik.touched.city && formik.errors.city && (
        <small className="text-danger">{formik.errors.city}</small>
    )}
    </div>
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="street"
        placeholder="street"
        name="street"
        value={formik.values.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="street">street</label>
    {formik.touched.street && formik.errors.street && (
        <small className="text-danger">{formik.errors.street}</small>
    )}
    </div></div>
    <div className="row">
    <div className="form-floating mb-3 col-md-6">
    <input
        type="number"
        className="form-control"
        id="housenumber"
        placeholder="housenumber"
        name="housenumber"
        value={formik.values.housenumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="housenumber">house number</label>
    {formik.touched.housenumber && formik.errors.housenumber && (
        <small className="text-danger">{formik.errors.housenumber}</small>
    )}
    </div>
    <div className="form-floating mb-3 col-md-6">
    <input
        type="number"
        className="form-control"
        id="zip"
        placeholder="zip"
    />
    <label htmlFor="zip">zip</label>
    </div>
    </div>
    <div className="form-check ms-3 text-start fw-bold">
                        <input className="form-check-input" type="checkbox" id="roleCheckbox"
                            name="role"
                            checked={formik.values.role === "isBussiness"}
                            onChange={(e) => {
                                formik.setFieldValue("role", e.target.checked ? "isBussiness" : "isUser");
                            }}
                            onBlur={formik.handleBlur} />
                        <label className="form-check-label " htmlFor="roleCheckbox" style={{color: theme.color}}>
                            SignUp as Bussiness
                        </label>
                        {formik.touched.role && formik.errors.role && (
                            <p className="text-danger">{formik.errors.role}</p>)}
                    </div>
    <button
type="submit"
className="btn btn-success my-3 w-100"
disabled={!formik.isValid || !formik.dirty}
>
Register
</button>
    </form>
    </div>
    </div>
    </>);
}

export default Register;

