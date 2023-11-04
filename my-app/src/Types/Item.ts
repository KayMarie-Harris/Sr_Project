import Modification from "./Mod";

type Item = {
    "name": string,
    "type": string,
    "description": string,
    "price": number,
    "mod": Modification[],
}

export default Item;