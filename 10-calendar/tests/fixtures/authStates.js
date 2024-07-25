
//Data de estados para simular datos del authSlice de los test

export const initialState = {
    status: 'checking', // 'authenticated'  'not-authenticated'
    user: {},
    errorMessage: undefined,
}

export const authenticatedState = {
    status: 'authenticated',
    user: {
        uid: '669693fc6ee51fd076f93b0f',
        name: 'test'
    },
    errorMessage: undefined,
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: undefined,
}
