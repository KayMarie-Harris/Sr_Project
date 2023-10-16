import Item from "./Item"

type Order = {
    "total": number,
    "status": string, // TODO: Make into an enum
    "items": Item[],
}

export default Order;