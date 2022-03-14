export const setUser = (userId, name, email) => {
    return (dispatch) => {
        dispatch({
            type: "set_user",
            payload: {
                userId,
                name,
                email
            }
        });
    }
}

export const LogoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: "logout_user",
            payload: null
        });
    }
}

export const updateTask = (tasks) => {
    return (dispatch) => {
        dispatch({
            type: "updateTask",
            payload: tasks
        });
    }
}
