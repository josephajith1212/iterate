import {createContext, useReducer, useEffect} from "react";
import {myFirebaseAuth} from "../firebase/config";


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null}
        case "AUTH_READY":
            return {user: action.payload, authReady: true}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authReady: false
    })

    useEffect(() => {
        const unsub = myFirebaseAuth.onAuthStateChanged(user => {
            dispatch({type: 'AUTH_READY', payload: user})
            unsub()
        })
    }, [])

    // console.log("state: ", state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}