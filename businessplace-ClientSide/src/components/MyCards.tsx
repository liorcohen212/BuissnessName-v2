import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Card from "../interfaces/Card";
import { deleteCard, getCardsByOwner} from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { addToFavorites, getFavorites, removeFromFavorites} from "../services/favoritesService";

interface MyCardsProps {
    cardInfo: any ;
    setCardInfo: Function;
    userInfo: any;
    setUserInfo: Function;
}

const MyCards: FunctionComponent<MyCardsProps> = ({cardInfo, setCardInfo ,userInfo ,setUserInfo}) => {
    let theme = useContext(SiteTheme)
    let navigate = useNavigate()
    let [favorites, setFavorites] = useState<string[]>([])
    let roles = (userInfo.role === "isBussiness" || userInfo.role === "isAdmin" || userInfo.role === "isUser");
    let [cards, setCards] = useState<Card[]>([]);
    let [dataUpdated, setDataUpdated] = useState<boolean>(false);
    let handleAddToFavorites = (card: Card) => {
        if (favorites.includes(card._id as string)) {
            removeFromFavorites(userInfo._id, card._id as string)
        .then((res) => {
            setFavorites(favorites.filter((_id) => _id !== card._id));
            successMsg(`${card.title} bussiness card was removed from favorites`);})
        .catch((err) => {console.log(err);});
        } else {
            addToFavorites(userInfo.id, card)            
            .then((res) => {
                setFavorites([...favorites, card._id as string]);
                successMsg(`${card.title} bussiness card was added successfully`);})
                .catch((err) => { console.log(err);});
        }};
    useEffect(() => {
        // getFavorites(userInfo._id).then((res) => {
        // let userFavorites = res.data.find((fav: any) => fav.userId === userInfo._id);
        // let defaultCardIds: string[] = userFavorites?.cards.map((card: any) => card._id) || [];
        // setFavorites(defaultCardIds)
        // }).catch((err) => console.log(err));
        
        getCardsByOwner()
        .then((res) => setCards(res.data))
        .catch((err) => console.log(err));
    }, [cardInfo.phone, dataUpdated, userInfo.phone]);
    let handleDelete = (_id:string) => {
        if(window.confirm("Are you sure?")) {
            deleteCard(_id)
            .then((res) => {
                navigate("/showBussiness")
                successMsg("Card deleted successfully!");
            })
            .catch((err) => {
                errorMsg("action declined")
                console.log(err)});
        }}
return(<>
        <div style={{color: theme.color, background: theme.background}}>
        <h1>Youre cards</h1>
        {cards.length ? (
        <div className="container">
        <div className="row">
        {cards.map((card: Card) => (
        <div
            key={card._id}
            className="card col-md-4 mx-2 mb-5"
            style={{ width: "18rem",background: theme.cardBg }}
        >
            <img 
            src={card.imageUrl}
            className="card-img-top cardImg "
            alt={card.imageAlt} 
            style={{ width: "16.5rem", height: "16.5rem" }}
            onClick={() => navigate(`/showbussiness/show/${card._id}`)} />
            <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.subtitle}.</p>
            </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item mb-0" style={{background: theme.cardBg}}>{card.phone}</li>
            <li className="list-group-item mb-0" style={{background: theme.cardBg}}>{card.city}{card.street}{card.housenumber}</li>
            <li className="list-group-item mb-0" style={{background: theme.cardBg}}>{card._id}</li>
            </ul>
            <div className="card-body">
            <Link to="tel: {card.phone}" ><i className="fa-solid fa-phone"></i></Link>
                {roles && ( favorites.includes(card._id as string) ?(<>
                <div className="col right-icons text-end">
                    <Link to="/showbussiness" className="btn col text-danger" onClick={() => {
                        handleAddToFavorites(card);}}>
                            <i className="fa-solid fa-heart"></i>
                        </Link>
                </div>
                    </>) : (
                        <Link to="/showbussiness" className="btn col" onClick={() => {handleAddToFavorites(card);}}>
                            <i className="fa-solid fa-heart"></i>
                        </Link>
                    ))}
    <Link to="" className="btn btn-danger" onClick={() => handleDelete(card._id as string)}><i className="fa-solid fa-trash"></i></Link>
    <Link to={`update/${card._id}`} className="btn btn-warning mx-1"><i className="fa-solid fa-pen-to-square"></i></Link>
            </div>
        </div>
        ))}
        </div>
        </div>
    ) : 
    (<p>No cards available</p>)
    }
    </div>
    </>);
}

export default MyCards;