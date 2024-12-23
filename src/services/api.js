// URL da API : https://api.themoviedb.org/3/movie/now_playing?api_key=039664d6a1181ffddf5360026a38471d&language=pt-BR
// Base da URL :  https://api.themoviedb.org/3/
import Axios from "axios";

const api = Axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "039664d6a1181ffddf5360026a38471d",
    language: "pt-BR",
  },
});
export default api;
