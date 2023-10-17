import Modification from "./Mod";

type Item = {
    "name": string,
    "description": string,
    "price": number,
    "mod": Modification[],
}

export default Item;