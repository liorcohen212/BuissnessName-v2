export default  interface Card {
    title: string,
    description: string,
    email: string;
    imageUrl?: string,
    state?: string;
    city: string;
    housenumber: number;
    subtitle: string;
    phone:string;
    web?: string;
    imageAlt?: string;
    country: string;
    street: string;
    _id?: string;
    zip?: number;
    owner?: string;
}