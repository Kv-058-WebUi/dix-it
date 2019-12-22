function testReducer(state = [], action:any) {
    switch(action.type) {
        case 'TEST':
            return action.payload;
        default:
            return state
    }
}

export default testReducer;
