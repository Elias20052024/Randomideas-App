import axios from 'axios';

class ideasApi {
    constructor() {
        this.baseUrl = '/api/ideas';
    }

    getIdeas() {
        return axios.get(this.baseUrl);
    }

    createIdea(data) {
        return axios.post(this.baseUrl, data);
    }

    updateIdea(id, data) {
        return axios.put(`${this.baseUrl}/${id}`, data);
    }

    deleteIdea(id, data) {
        const username = localStorage.getItem('username')
            ? localStorage.getItem('username')
            : '';
        return axios.delete(`${this.baseUrl}/${id}`, { data: { username } });
    }
}

export default new ideasApi();
