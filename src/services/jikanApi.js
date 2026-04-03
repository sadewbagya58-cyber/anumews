const BASE_URL = 'https://api.jikan.moe/v4';

export const fetchJJKAnime = async () => {
  try {
    const response = await fetch(`${BASE_URL}/anime?q=Jujutsu Kaisen&limit=12&order_by=start_date&sort=asc`);
    if (!response.ok) {
      throw new Error('Failed to fetch JJK anime');
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
