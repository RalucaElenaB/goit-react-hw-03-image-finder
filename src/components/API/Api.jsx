import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40728648-1b398202c5fa26f14327021d8';

const getImages = async (search, page) => {
  const response = await axios.get(BASE_URL, {
    method: 'get',
    params: {
      key: API_KEY,
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return response;
};

export default getImages;
