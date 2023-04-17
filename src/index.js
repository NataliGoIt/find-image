import "../css/styles.css";
import { fetchImage } from "./fetchimage";
// console.log(fetchImage);

fetchImage().then(console.log).catch(console.log);
