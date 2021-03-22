export const SET_LOADING = 'SET_LOADING';
export const setLoading = (loading) => ({ type: SET_LOADING, loading });

export const EXIT_APP = 'EXIT_APP';
export const exitApp = (exit = false) => ({ type: EXIT_APP, exit });
