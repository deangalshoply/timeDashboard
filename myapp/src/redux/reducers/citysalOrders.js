const initialState = {}

const citysalDataReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_CITYSAL_DATA':
           return state = action.payload
        
        case 'GET_CITYSAL_DATA':
            return state

        default:
            return state;
    }
}

export default citysalDataReducer