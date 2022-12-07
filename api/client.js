import axios from "axios";

export default axios.create({ baseURL: "http://192.168.1.66:8000" }); // my house
// export default axios.create({ baseURL: "http://146.95.36.90:8000" }) // school
// export default axios.create({ baseURL: "http://localhost:8000" })
