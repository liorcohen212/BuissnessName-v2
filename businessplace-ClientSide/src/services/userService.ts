import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

let api : string = process.env.REACT_APP_API as string;

export function checkUser(userToCheck: User) {
    return axios.post(`${api}/login`, userToCheck);
}
export function addUser(addUser: User){
    return axios.post(`${api}/register`, addUser);
}
export function getUserById(_id: string){
    return axios.get(`${api}/users/${_id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
export function updateUser(updatedUser: User, _id: string){
    return axios.put(`${api}/users/${_id}`, updatedUser , { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
export function getUser(){
    return axios.get(`${api}/users`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
export function deleteUser(_id:String){
    return axios.delete(`${api}/users/${_id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

// get token details from local storage.
export function getTokenDetailes() {
    let token = JSON.parse(sessionStorage.getItem("token") as string).token;
    return jwt_decode(token)}