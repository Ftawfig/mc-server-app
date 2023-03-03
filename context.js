import { createContext, useState } from "react";

export const UserContext = createContext(null);

function Context({ children }) {
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}