import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import Card from "../interfaces/Card";
import { getCardById } from "../services/cardService";
import { Link, useParams } from "react-router-dom";

interface BussinessPageProps {
}
 
const BussinessPage: FunctionComponent<BussinessPageProps> = () => {
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
    return (<>
        <div style={{color: theme.color, background: theme.background}}>
        {card && (<>
        <div className="container" style={{margin: 0, paddingTop: 20}}>
        <img src={card.imageUrl} width={300} alt={card.imageAlt} />
        <p>{card.title}</p>
        <p>{card.subtitle}</p>
        <p>{card.description}</p>
        <p>Phone: <Link to="tel: {card.phone}">{card.phone}</Link> </p>
        <p>Website: <Link to="">{card.web}</Link></p>
        <p>Contact Email: <Link to="emailto: {card.email}">{card.email}</Link></p>
        <p>Located At: <br /> {card.street} {card.housenumber},<br /> {card.city},<br /> {card.country},<br /> {card.zip} {card.state} </p>
        </div>
        </>)}
        </div>
        </>
    )
        }

export default BussinessPage;