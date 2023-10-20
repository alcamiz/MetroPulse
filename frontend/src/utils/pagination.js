import axios from "axios";
import { frontend_website } from "../frontend_website";

const min = (first, second) => {
    if (first < second) {
        return first;
    } else {
        return second;
    }
};

export const get_centers_length = async () => {
    const response = await axios.get(`${frontend_website}/centers`);
    return response.data["total_size"];
  };

export const fetch_centers = async (page_num) => {
    const response = await axios.get(
        frontend_website + "centers?page=" + page_num
    );
    return response.data["data"];
};

export const get_hospitals_length = async () => {
    const response = await axios.get(`${frontend_website}/hospitals`);
    return response.data["total_size"];
  };

export const fetch_hospitals = async (page_num) => {
    const response = await axios.get(
        frontend_website + "hospitals?page=" + page_num
    );
    return response.data["data"];
};

export const get_neighborhoods_length = async () => {
    const response = await axios.get(`${frontend_website}/neighborhoods`);
    return response.data["total_size"];
  };

export const fetch_neighborhoods = async (page_num) => {
    const response = await axios.get(
        frontend_website + "neighborhoods?page=" + page_num
    );
    return response.data["data"];
};
