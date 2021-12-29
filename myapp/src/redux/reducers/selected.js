const initialState = {}

const selectedReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_SELECTED':
            
           return state = action.payload
        
        default:
            return state;
    }
}

export default selectedReducer