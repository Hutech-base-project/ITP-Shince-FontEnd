export const selectAuth = (state) =>state.AuthPage.auth
export const selectLoading= (state) =>state.AuthPage.isLoading
export const selectErrorLogin = (state) =>state.AuthPage.loginError
export const selectErrorRegister = (state) =>state.AuthPage.registerError