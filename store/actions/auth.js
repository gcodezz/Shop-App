import { AsyncStorage } from 'react-native'

// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({
            type: AUTHENTICATE,
            userId: userId,
            token: token
        })
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfd6s60D0msPSuoG1H0vSCOzLXIuyOmDg',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!'
            } 
            throw new Error(message)         
        }

        const resData = await response.json()

        console.log(resData)
        dispatch(
            authenticate(
                resData.localId, 
                resData.idToken, 
                parseInt(resData.expiresIn) * 1000
            )
        )
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfd6s60D0msPSuoG1H0vSCOzLXIuyOmDg',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            if (errorId === 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD') {
                message = 'Incorrect login details, Try again!'
            } 
            throw new Error(message)         
        }

        const resData = await response.json()
        //console.log(resData)
        dispatch(
            authenticate(
                resData.localId, 
                resData.idToken, 
                parseInt(resData.expiresIn) * 1000
            )
        )
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {
        type: LOGOUT
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    )
}