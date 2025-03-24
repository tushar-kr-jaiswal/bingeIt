export { removeMovie } from "../reducers/MovieSlice.jsx";
import axios from "../../utils/Axios.jsx";
import { loadMovie } from "../reducers/MovieSlice.jsx";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalId = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
        const translations = await axios.get(`/movie/${id}/translations`);
        let theUltimate = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m) => m.type == "Trailer"),
            watchProviders: watchProviders.data.results.IN,
            translations: translations.data.translations.map((t) => t.name),
        };
        dispatch(loadMovie(theUltimate));
        // console.log(theUltimate);
    } catch (error) {
        console.log(error);
    }
};
