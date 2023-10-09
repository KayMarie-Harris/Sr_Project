import Modification from "./Mod";

type Item = {
    "name": string,
    "price": number,
    "mod": Modification[],
}

export default Item;