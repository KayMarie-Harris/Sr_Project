import Item from "./Item"

type Order = {
    "email": string,
    "total": number,
    "status": string,
    "items": Item[],
}

export default Order;