import {environmentProd} from "./environment.prod";
import {environmentDev} from "./environment.dev";
var environment = null;
if (process.env.NODE_ENV === "production") {
    environment = environmentProd;
} else {
    environment = environmentDev;
}
export default environment;