import { SERVER_API } from "../../config.json";
const getCountries = async (endpoint) => {
    const response = await fetch(`${SERVER_API}${endpoint}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Error Fetch");
    }
};
const deleteCountry = async (endpoint) => {
    const response = await fetch(`${SERVER_API}${endpoint}`, {
        method: "DELETE",
    });
    return response.ok;
};
const getCountry = async (endpoint) => {
    return getCountries(endpoint);  
};
const updateCountry = async (endpoint, data) => {
    const response = await fetch(`${SERVER_API}${endpoint}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.ok;
};
const postCountry = async (endpoint, data) => {
    const response = await fetch(`${SERVER_API}${endpoint}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.ok;
};
export { getCountries, deleteCountry, getCountry, updateCountry, postCountry };
