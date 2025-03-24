import { loadTv, removeTv } from "../reducers/TvSlice.jsx";
import axios from "../../utils/Axios.jsx";

export const asyncLoadTv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const translations = await axios.get(`/tv/${id}/translations`);
    let theUltimate = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type == "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      translations: translations.data.translations.map((t) => t.name),
    };
    dispatch(loadTv(theUltimate));
    // console.log(theUltimate);
  } catch (error) {
    console.log(error);
  }
};
