import axios from "axios";

export default axios.create({ baseURL: "http://192.168.12.119:8000" }) // my house
// export default axios.create({ baseURL: "http://146.95.38.153:8000" }) // school
// export default axios.create({ baseURL: "http://localhost:8000" })

