const initialState = {}

const domainReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_DOMAIN':
            
           return state = action.payload
        
        default:
            return state;
    }
}

export default domainReducer