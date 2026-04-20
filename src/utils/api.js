import axios from 'axios';

const BASE_URL = 'https://newsdata.io/api/1';
const API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  params: { apikey: API_KEY },
});

export const fetchNews = async ({ language = 'en', category = '', query = '', country = '', page = null } = {}) => {
  const params = {};
  if (language) params.language = language;
  if (category) params.category = category;
  if (query) params.q = query;
  if (country) params.country = country;
  if (page) params.page = page;

  const response = await api.get('/news', { params });
  return response.data;
};

export const fetchLatestNews = async ({ language = 'en', category = '', query = '', country = '' } = {}) => {
  const params = {};
  if (language) params.language = language;
  if (category) params.category = category;
  if (query) params.q = query;
  if (country) params.country = country;

  const response = await api.get('/latest', { params });
  return response.data;
};

export default api;
