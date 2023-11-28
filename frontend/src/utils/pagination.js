import axios from "axios";
import { backend_website } from "../backend_website";

export const get_centers_length = async (
  boroughFilter,
  neighborhoodFilter,
  zipcodeFilter
) => {
    let website = `${backend_website}/centers?page=1`;
    if (boroughFilter) {
      website += `&borough=${encodeURIComponent(boroughFilter)}`;
    }
    if (neighborhoodFilter) {
      website += `&nta=${encodeURIComponent(neighborhoodFilter)}`;
    }
    if (zipcodeFilter) {
      website += `&zip=${encodeURIComponent(zipcodeFilter)}`;
    }
    const response = await axios.get(website);
    return response.data["total_size"];
  };

export const fetch_centers = async (
  page_num,
  sort,
  order,
  boroughFilter,
  neighborhoodFilter,
  zipcodeFilter,
  per_page
) => {
  let website = `${backend_website}/centers?page=${page_num}`;
  if (sort) {
      website += `&sort_by=${encodeURIComponent(sort)}`;
    }
    if (order) {
      website += `&sort_order=${encodeURIComponent(order)}`;
    }
    if (boroughFilter) {
      website += `&borough=${encodeURIComponent(boroughFilter)}`;
    }
    if (neighborhoodFilter) {
      website += `&nta=${encodeURIComponent(neighborhoodFilter)}`;
    }
    if (zipcodeFilter) {
      website += `&zip=${encodeURIComponent(zipcodeFilter)}`;
    }
    if (per_page) {
      website += `&per_page=${encodeURIComponent(per_page)}`;
    }
    console.log(website);
    const response = await axios.get(website);
    return response.data["data"];
};

// export const fetch_centers = async (page_num) => {
//     const response = await axios.get(
//         frontend_website + "centers?page=" + page_num
//     );
//     return response.data["data"];
// };

export const get_hospitals_length = async (
  boroughFilter,
  neighborhoodFilter,
  zipcodeFilter) => {
      let website = `${backend_website}/hospitals?page=1`;
      if (boroughFilter) {
        website += `&borough=${encodeURIComponent(boroughFilter)}`;
      }
      if (neighborhoodFilter) {
        website += `&nta=${encodeURIComponent(neighborhoodFilter)}`;
      }
      if (zipcodeFilter) {
        website += `&zip=${encodeURIComponent(zipcodeFilter)}`;
      }
      const response = await axios.get(website);
      return response.data["total_size"];
    };

export const fetch_hospitals = async (
  page_num,
  sort,
  order,
  boroughFilter,
  neighborhoodFilter,
  zipcodeFilter,
  per_page
) => {
  let website = `${backend_website}/hospitals?page=${page_num}`;
  if (sort) {
      website += `&sort_by=${encodeURIComponent(sort)}`;
    }
    if (order) {
      website += `&sort_order=${encodeURIComponent(order)}`;
    }
    if (boroughFilter) {
      website += `&borough=${encodeURIComponent(boroughFilter)}`;
    }
    if (neighborhoodFilter) {
      website += `&nta=${encodeURIComponent(neighborhoodFilter)}`;
    }
    if (zipcodeFilter) {
      website += `&zip=${encodeURIComponent(zipcodeFilter)}`;
    }
    if (per_page) {
      website += `&per_page=${encodeURIComponent(per_page)}`;
    }
    console.log(website);
    const response = await axios.get(website);
    return response.data["data"];
};

export const get_neighborhoods_length = async (
  boroughFilter,
  fipsFilter) => {
    let website = `${backend_website}/neighborhoods?page=1`;
    if (boroughFilter) {
      website += `&borough=${encodeURIComponent(boroughFilter)}`;
    }
    if (fipsFilter) {
      website += `&fips=${encodeURIComponent(fipsFilter)}`;
    }
    const response = await axios.get(website);
    return response.data["total_size"];
  };

export const fetch_neighborhoods = async (
  page_num,
  sort,
  order,
  boroughFilter,
  fipsFilter,
  per_page
  ) => {
  let website = `${backend_website}/neighborhoods?page=${page_num}`;
  if (sort) {
      website += `&sort_by=${encodeURIComponent(sort)}`;
    }
    if (order) {
      website += `&sort_order=${encodeURIComponent(order)}`;
    }
    if (boroughFilter) {
      website += `&borough=${encodeURIComponent(boroughFilter)}`;
    }
    if (fipsFilter) {
      website += `&fips=${encodeURIComponent(fipsFilter)}`;
    }
    if (per_page) {
      website += `&per_page=${encodeURIComponent(per_page)}`;
    }
    console.log(website);
    const response = await axios.get(website);
    return response.data["data"];
};
