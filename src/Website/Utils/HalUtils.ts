import {HalLink} from "hal-types";
import {EntityModel} from "hateoas-hal-types"
import FetchUtils from "./FetchUtils";

export default {
    getData: async function <T> (link: HalLink):Promise<EntityModel<T>> {
        const init = FetchUtils.init();
        const href = new URL(link.href);
        const path = href.pathname

        return fetch(path, init)
            .then(res => res.json())
            .catch(error => console.error(error))
    }
}