
import axios from 'axios'

export const getMovieData = async () =>{
    try{
        const {data} = await axios.get(
            `http://www.omdbapi.com/?s=inception&apikey=41f0a99c`
        );
        return data;
    }catch (error){
        return error;
    }
}

export default {getMovieData};
