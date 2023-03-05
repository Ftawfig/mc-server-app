import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

//returns the current authorized user state
export function getUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    //check for a user in localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const value = { user, setUser };

    return (
        <UserContext.Provider value={ value }>
            { children }
        </UserContext.Provider>
    );
}
