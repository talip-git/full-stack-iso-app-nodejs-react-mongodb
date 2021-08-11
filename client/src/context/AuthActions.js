export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START",
})
export const LoginSucess = (user)=>({
    type:"LOGIN_START",
    payload:user,
})
export const LoginFailure = (error)=>({
    type:"LOGIN_START",
    payload:error,
})
export const FetchStandards =(standards)=>({
    type:"FETCH_STANDARDS",
    payload:standards,
})