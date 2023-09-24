export default  interface User {
    _id?: string;
    firstname?: string,
    middlename?: string,
    lastname?: string,
    phone?: string;
    email?:string;
    password?: string;
    imageurl?: string;
    imagealt?:string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    housenumber?: number;
    zip?: number;
    role?: string;
}