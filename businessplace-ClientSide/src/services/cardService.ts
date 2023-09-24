import axios from "axios";
import Card from "../interfaces/Card";

let api : string = `${process.env.REACT_APP_API}/cards`;

export function getcard(){
    return axios.get(api);
}

export function getCardById(_id:string){
    return axios.get(`${api}/${_id}`);
}

export function getCardsByOwner() {
    return axios.get(`${api}/my-cards`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
export function addCard(newcard: Card){
    return axios.post(api, newcard, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function updateCard(updatedcard: Card, _id:String){
    return axios.put(`${api}/${_id}`, updatedcard , { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } } );
}
export function deleteCard(_id:String){
    return axios.delete(`${api}/${_id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
