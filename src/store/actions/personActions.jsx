export { removePerson } from "../reducers/PersonSlice.jsx";
import axios from "../../utils/Axios.jsx";
import { loadPerson } from "../reducers/PersonSlice.jsx";

export const asyncLoadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    let theUltimate = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };
    dispatch(loadPerson(theUltimate));
    // console.log(theUltimate);
  } catch (error) {
    console.log(error);
  }
};
