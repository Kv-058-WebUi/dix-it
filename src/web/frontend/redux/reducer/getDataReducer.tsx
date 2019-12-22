function getDataReducer(state = [], action:any) {
    switch(action.type) {
        case 'GET_DATA':
            return action.payload;
        default:
            return state
    }
}

export default getDataReducer;
