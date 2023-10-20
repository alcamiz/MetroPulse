import axios from "axios";
import { frontend_website } from "../frontend_website";

export const getMedical = async (medical_id) => {
  const response = await axios.get(
    frontend_website + `hospitals/${medical_id}`
  );
  return response.data["data"];
};

export const getNeighborhood = async (nta_id) => {
  const response = await axios.get(
    frontend_website + `neighborhoods/${nta_id}`
  );
  return response.data["data"];
};

export const getCenter = async (test_id) => {
  const response = await axios.get(frontend_website + `centers/${test_id}`);
  return response.data["data"];
};

export const getMedicals = async () => {
  const response = await axios.get(
    frontend_website + `hospitals`
  );
  return response.data["data"];
};

export const getNeighborhoods = async () => {
  const response = await axios.get(
    frontend_website + `neighborhoods`
  );
  return response.data["data"];
};

export const getCenters = async () => {
  const response = await axios.get(frontend_website + `centers`);
  return response.data["data"];
};

// centers_list = getCenters()
// centers_list.length