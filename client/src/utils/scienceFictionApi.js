import axios from 'axios';

const API_URL = 'https://mxpertztestapi.onrender.com/api/sciencefiction';

/**
 * Fetch all science fiction stories from the API
 * @returns {Promise<Array>} Array of science fiction stories
 */
export const fetchScienceFictionStories = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching science fiction stories:', error);
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
};

/**
 * Fetch science fiction stories using native fetch (alternative to axios)
 * @returns {Promise<Array>} Array of science fiction stories
 */
export const fetchScienceFictionStoriesWithFetch = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching science fiction stories:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Fetch a specific story by ID (if needed in future)
 * @param {string} storyId - The ID of the story to fetch
 * @returns {Promise<Object>} Story object
 */
export const fetchStoryById = async (storyId) => {
  try {
    const { data } = await axios.get(API_URL);
    const story = data.find(s => s._id === storyId);
    
    if (!story) {
      return { success: false, error: 'Story not found' };
    }
    
    return { success: true, data: story };
  } catch (error) {
    console.error('Error fetching story:', error);
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
};

