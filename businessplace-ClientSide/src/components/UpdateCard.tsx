import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById, updateCard } from "../services/cardService";
import Card from "../interfaces/Card";
import { useFormik } from "formik";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedbackService";
import { SiteTheme } from "../App";

interface UpdateCardProps {
    
}

const UpdateCard: FunctionComponent<UpdateCardProps> = () => {
    let theme = useContext(SiteTheme)
    let {_id} = useParams();
    useEffect(() => {
        getCardById(String(_id))
        .then((res) => setCard(res.data))
        .catch((err) => console.log(err));
    }, [_id]);
    let [card, setCard] = useState<Card>({
        title: "",
        subtitle: "",
        description: "", 
        phone: "", 
        email: "", 
        country: "",
        city: "",
        street: "",
        housenumber: 0,
    })
    let formik = useFormik({
        initialValues: {
            title: card.title,
        subtitle: card.subtitle,
        description: card.description, 
        phone: card.phone, 
        email: card.email, 
        web: card.web,
        imageUrl: card.imageUrl,
        imageAlt: card.imageUrl,
        state: card.state,
        country: card.country,
        city: card.city,
        street: card.street,
        housenumber: card.housenumber,
        zip: card.zip,},
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required().min(1),
            subtitle: yup.string().required().min(1),
            description: yup.string().required().min(1),
            phone: yup.string().required().min(9),
            email: yup.string().required().email(),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            housenumber: yup.number().required().min(1)
        }),
        onSubmit(values){
            console.log(values);
            
            updateCard(values, String(_id))
            .then((res) => {
                successMsg("card updated successfully")
            })
            .catch((err) => {console.log(err)
            errorMsg("make sure all fields are filled correctly")
            });
        },
    });
    return (<>
        <div style={{background: theme.background}}>
    <div className="container col-md-7">
<form onSubmit={formik.handleSubmit}>
    <h3 className="display-3" style={{color: theme.color}}>UPDATE CARD</h3>
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
    </div><button
type="submit"
className="btn btn-success my-3 w-100"
disabled={!formik.isValid || !formik.dirty}
>
Update card
</button>
    </form>
    </div>   
    </div>
    </>);
}

export default UpdateCard;