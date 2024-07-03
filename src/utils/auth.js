// utils/auth.js

// Mock authentication function
export const login = (username) => {
    if (username) {
        localStorage.setItem('username', username);
        return true;
    }
    return false;
};

// Mock logout function
export const logout = () => {
    localStorage.removeItem('username');
};

// Check if a user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('username');
};

// Get the current authenticated user's username
export const getUsername = () => {
    return localStorage.getItem('username');
};
