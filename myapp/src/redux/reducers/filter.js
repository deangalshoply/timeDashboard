
const filtersReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_FILTERS':
            return [...state, action.payload];

        case 'ADD_FILTER_DATA':
            let newState = [...state]
            newState.forEach(element => {
                if(element.name == action.payload.name){
                    element.data.push(action.payload.data)
                }
            })
            return newState

            case 'REMOVE_FILTER_DATA':
            let removeState = [...state]
            removeState.forEach(element => {
                if(element.name == action.payload.name){
                 let index = element.data.indexOf(action.payload.data)
                 element.data.splice(index,1)
                }
            })
            return removeState;
        default:
            return state;
    }
}

export default filtersReducer