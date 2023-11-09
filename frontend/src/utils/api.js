import axios from "axios";
import { backend_website } from "../backend_website";

export const getMedical = async (medical_id) => {
  const response = await axios.get(
    backend_website + `hospitals/${medical_id}`
  );
  return response.data["data"];
};

export const getNeighborhood = async (nta_id) => {
  const response = await axios.get(
    backend_website + `neighborhoods/${nta_id}`
  );
  return response.data["data"];
};

export const getCenter = async (test_id) => {
  const response = await axios.get(backend_website + `centers/${test_id}`);
  return response.data["data"];
};

export const getMedicals = async () => {
  const response = await axios.get(
    backend_website + `hospitals`
  );
  return response.data["data"];
};

export const getNeighborhoods = async () => {
  const response = await axios.get(
    backend_website + `neighborhoods`
  );
  return response.data["data"];
};

export const getCenters = async () => {
  const response = await axios.get(backend_website + `centers`);
  return response.data["data"];
};

export const searchModels = async (search_text) => {
  const search_text_encoded = encodeURIComponent(search_text);
  const response = await axios.get(
    backend_website + `search?string=${search_text_encoded}`
  );
  return response.data;
}

export const searchSpecificModel = async (search_text, model) => {
  const search_text_encoded = encodeURIComponent(search_text);
  const response = await axios.get(
    backend_website + `search?string=${search_text_encoded}&model=${model}`
  )
  return response.data;
}