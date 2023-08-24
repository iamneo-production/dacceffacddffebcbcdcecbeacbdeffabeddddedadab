import axios from 'axios';

const fetchData = async (searchTerm) => {
  try {
    const response = await axios.get(`https://api.url.com?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;