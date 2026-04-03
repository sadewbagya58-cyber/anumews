const BASE_URL = 'https://api.jikan.moe/v4';

export const fetchTopAiringAnime = async (limit = 24) => {
  try {
    const response = await fetch(`${BASE_URL}/top/anime?filter=airing&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch top airing anime');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    return [];
  }
};

export const fetchAnimeDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/anime/${id}/full`);
    if (!response.ok) {
      throw new Error('Failed to fetch anime details');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    return null;
  }
};
