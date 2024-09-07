import React, { createContext, useState, useContext } from 'react';

// Create a context to store the user's email
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
