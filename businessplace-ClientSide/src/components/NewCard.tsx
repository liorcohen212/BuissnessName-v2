import { useFormik } from "formik";
import { FunctionComponent, useContext} from "react";
import * as yup from "yup";
import { SiteTheme } from "../App";
import { addCard } from "../services/cardService";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackService";
interface NewCardProps {
    
}

const NewCard: FunctionComponent<NewCardProps> = () => {
    let navigate = useNavigate()
    let theme = useContext(SiteTheme)
    let formik = useFormik({
        initialValues: {title: "", subtitle: "", description: "", phone: "", email:"", web: "", imageUrl: "", imageAlt: "", state:"", country:"",city:"",street:"",housenumber: 0, zip: 0, owner: ""},
        validationSchema: yup.object({
            title: yup.string().required().min(1),
            subtitle: yup.string().required().min(1),
            description: yup.string().required().min(1),
            phone: yup.string().required().min(9),
            email: yup.string().required().email(),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            housenumber: yup.number().required().min(1),
            owner: yup.string().required().email()
        }),
        onSubmit(values){
            console.log(values);
            
            addCard(values)
            .then((res) => {
                navigate("/showBussiness")
                successMsg("Card added successfully")
            })
            .catch((err) => {console.log(err)
            errorMsg("make sure all fields are filled correctly")
            });
        },
    });
    return (<>
        <div style={{color: theme.color, background: theme.background}}>
    <div className="container col-md-7">
<form onSubmit={formik.handleSubmit}>
    <h3 className="display-3">CREATE CARD</h3>
    <div className="row">
        <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="title"
        placeholder="title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="title">title</label>
    {formik.touched.title && formik.errors.title && (
        <small className="text-danger">{formik.errors.title}</small>
    )}
    </div>
        <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="subtitle"
        placeholder="subtitle"
        name="subtitle"
        value={formik.values.subtitle}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="subtitle">subtitle</label>
    {formik.touched.subtitle && formik.errors.subtitle && (
        <small className="text-danger">{formik.errors.subtitle}</small>
    )}
    </div></div>
    <div className="row">
        <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="description"
        placeholder="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="description">description</label>
    {formik.touched.description && formik.errors.description && (
        <small className="text-danger">{formik.errors.description}</small>
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
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="web"
        placeholder="web"
    />
    <label htmlFor="web">web</label>
    </div></div>
    <div className="row"> 
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="imageUrl"
        placeholder="imageUrl"
    />
    <label htmlFor="imageUrl">image Url</label>
    </div>
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="imageAlt"
        placeholder="imageAlt"
    />
    <label htmlFor="imageAlt">image Alt</label>
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
    <div className="form-floating mb-3 col-md-6">
    <input
        type="text"
        className="form-control"
        id="owner"
        placeholder="owner"
        name="owner"
        value={formik.values.owner}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    <label htmlFor="owner">owner</label>
    {formik.touched.owner && formik.errors.owner && (
        <small className="text-danger">{formik.errors.owner}</small>
    )}
    </div><button
type="submit"
className="btn btn-success my-3 w-100"
disabled={!formik.isValid || !formik.dirty}
>
Create Card
</button>
    </form>
    </div>
    </div>
</>);
}

export default NewCard;