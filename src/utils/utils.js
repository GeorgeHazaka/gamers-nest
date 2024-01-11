import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Async function to fetch more data for pagination
export const fetchMoreData = async (resource, setResource) => {
  try {
    // Make a GET request to the next page of the resource
    const { data } = await axiosReq.get(resource.next);

    // Update the state of the resource with the new data
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        // Ensure that duplicate items are not added to the results array
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    //console.log(err);
  }
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};