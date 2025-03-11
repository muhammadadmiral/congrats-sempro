/**
 * Utility for managing session data
 * This file handles setting up event listeners to clear localStorage when the browser is closed
 */

// Flag to track if we've initialized the cleanup event listener
let isInitialized = false;

/**
 * Initialize the session manager
 * Sets up an event listener to clear localStorage when the tab/window is closed
 */
export const initSessionManager = () => {
  if (isInitialized) return;
  
  // Using beforeunload event to detect when the user is leaving the page
  window.addEventListener('beforeunload', () => {
    // Clear the localStorage items related to our app
    localStorage.removeItem('skipIntro');
    // Add any other localStorage items you want to clear here
  });
  
  isInitialized = true;
  console.log('Session manager initialized - localStorage will be cleared on page close');
};

/**
 * Set a flag to skip the intro animation
 */
export const setSkipIntro = (value = true) => {
  localStorage.setItem('skipIntro', value.toString());
};

/**
 * Check if we should skip the intro animation
 */
export const shouldSkipIntro = () => {
  return localStorage.getItem('skipIntro') === 'true';
};

/**
 * Clear all session data
 * Can be called manually if needed
 */
export const clearSessionData = () => {
  localStorage.removeItem('skipIntro');
  // Add any other localStorage items you want to clear here
  console.log('Session data cleared');
};