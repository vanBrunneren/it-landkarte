const API_URL = '/api/';

export const fetchSingle = async (url, id) => {

    try {
        let res = await axios(API_URL + url + "/" + id);
        return res.data;
    } catch(err) {
        console.error(err);
    }

};

export const fetchAll = async (url) => {

    try {
        let res = await axios(API_URL + url);
        return res.data;
    } catch(err) {
        console.error(err);
    }

};

export const create = async (url, data) => {

    try {
        let res = await axios.post(API_URL + url, data);
        return res.data;
    } catch(err) {
        console.error(err);
    }

};

export const update = async (url, id, data) => {

    try {
        let res = await axios.put(API_URL + url + "/" + id, data);
        return res.data;
    } catch (err) {
        console.error(err);
    }

};

export const deleteEntry = async (url, id) => {

    try {
        let res = await axios.delete(API_URL + url + "/" + id);
        return res.data;
    } catch(err) {
        console.error(err);
    }

};

export const createWithFile = async (url, data) => {

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    try {
        let res = await axios.post(API_URL + url, data, config);
        return res.data;
    } catch(err) {
        console.error(err);
    }

};

export const updateWithFile = async (url, data, id) => {

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    try {
        let res = await axios.post(API_URL + url + "/" + id, data, config);
        return res.data;
    } catch(err) {
        console.error(err);
    }

};
