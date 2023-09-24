import { FunctionComponent, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { SiteTheme } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/userService";
import User from "../interfaces/User";
import { useFormik } from "formik";
import { errorMsg, successMsg } from "../services/feedbackService";

interface UpdateUserProps {
    userInfo: any;

}

const UpdateUser: FunctionComponent<UpdateUserProps> = ({userInfo}) => {
    let theme = useContext(SiteTheme)
    let {_id} = useParams();
    let navigate = useNavigate()
    useEffect(() => {
        getUserById(String(_id))
        .then((res) => setuser(res.data))
        .catch((err) => console.log(err));
    }, [_id]);
    let [user, setuser] = useState<User>({
        firstname: "",
        lastname: "",
        phone: "",  
        email: "", 
        country: "",
        city: "",
        street: "",
        housenumber: 0,
    })
    let formik = useFormik({
        initialValues: {
        firstname: user.firstname,
        middlename: user.middlename, 
        lastname: user.lastname,
        phone: user.phone,
        email: user.email, 
        imageUrl: user.imageurl,
        imageAlt: user.imagealt,
        state: user.state,
        country: user.country,
        city: user.city,
        street: user.street,
        housenumber: user.housenumber,
        zip: user.zip,
        role: user.role},
        enableReinitialize: true,
        validationSchema: yup.object({
            firstname: yup.string().required().min(0),
            lastname: yup.string().required().min(0),
            phone: yup.string().required().min(9),
            email: yup.string().required().email(),
            country: yup.string().required().min(0),
            city: yup.string().required().min(0),
            street: yup.string().required().min(0),
            housenumber: yup.number().required().min(0)
        }),
        onSubmit(values){
            updateUser(values, String(_id))
            .then((res) => {
                successMsg("User updated successfully")
                navigate("/showbussiness")}
            )
            .catch((err) => {
            console.log(err)
            errorMsg("Failed to update User")
        });
        },
    });
    return ( <>
    <div style={{background: theme.background}}><div className="container col-md-7">
<form onSubmit={formik.handleSubmit}>
    <h3 className="display-3" style={{color: theme.color}}>UPDATE CARD</h3>
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
        name="middlename"
    />
    <label htmlFor="middlename">middlename</label>
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
    <label htmlFor="lastname">lastname</label>
    {formik.touched.lastname && formik.errors.lastname && (
        <small className="text-danger">{formik.errors.lastname}</small>
    )}
    </div>
    <div className="form-floating mb-3 col-md-6">
    <input
        type="string"
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
    </div>
    <div className="row"> 
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="imageurl"
        placeholder="imageurl"
    />
    <label htmlFor="imageurl">image url</label>
    </div>
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="imagealt"
        placeholder="imagealt"
    />
    <label htmlFor="imagealt">image alt</label>
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
                            onChange={(e) => {formik.setFieldValue("role", e.target.checked ? "isBussiness" : "isUser");
                            }}
                            onBlur={formik.handleBlur} />
                        <label className="form-check-label " htmlFor="roleCheckbox" style={{color: theme.color}}>
                            change role
                        </label>
                        {formik.touched.role && formik.errors.role && (
                            <p className="text-danger">{formik.errors.role}</p>)}
                    </div>
    <button
type="submit"
className="btn btn-success my-3 w-100"
disabled={!formik.isValid || !formik.dirty}
>
Update User
</button>
    </form>
    </div>   
    </div>
    </>);
}
export default UpdateUser;