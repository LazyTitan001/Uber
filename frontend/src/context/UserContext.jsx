import React, { createContext } from 'react'

export const UserDataContext = createContext()


const UserContext = ({ children }) => {

    const [userData, setUserData] = useState({
        fullname: {
            firstname: firstName,
            lastname: lastName
        },
        email: email
    });

    return (
        <div>
            <div>
                <UserDataContext.Provider>
                    {children}
                </UserDataContext.Provider>
            </div>
        </div>
    )
}

export default UserContext
