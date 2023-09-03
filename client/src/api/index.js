import axios from 'axios';

const url = 'http://localhost:5000/';

export const createPost = (newPost) => axios.get(url, newPost);
