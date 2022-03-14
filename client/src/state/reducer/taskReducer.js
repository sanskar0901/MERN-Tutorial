const initState = []


const reducer = (state = initState, action)=>{
    switch(action.type){
        case "updateTask":
            let alterState = state;
            alterState = action.payload;
            return alterState;
        case "logout_user":
            return [];
        default:
            return state
    }
}

export default reducer