import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/favorites`;

export function createFavoritesById(_id: string){
    return axios.post(api, {_id, cards: []} );
}

export function getFavorites(_id: string){
    return axios.get(`${api}?_id=${_id}`)}

    export async function addToFavorites(_id: string, cardToAdd: Card) {
        try {
        let res = await getFavorites(_id);
        res.data[0].cards.push({ ...cardToAdd}); 
        return axios.patch(`${api}/${_id}`, 
        // return axios.patch(`${api}/${res.data[0].userId}`, 
        {cards: res.data[0].cards,});
        } catch (error) {
        console.log(error);
        }
    }
export function checkIfFavorite(_id: string, cardIds: number[]) {
    return axios.get(`${api}/${_id}/cards`, {
        params: {
            cardIds: cardIds.join(','),},});
}

export async function removeFromFavorites(_id: string, cardId: string) {
    try {
        let res = await getFavorites(_id);
        res.data[0].cards = res.data[0].cards.filter((card: Card) => card._id !== cardId);
    return axios.patch(`${api}/${res.data[0]._id}`, {
        cards: res.data[0].cards,
    });
    } catch (error) {
        console.log(error);
    }
}