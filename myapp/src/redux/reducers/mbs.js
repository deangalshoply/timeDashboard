const initialState = []

const mbsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_MBS_DATA':
           return state = action.payload

        case 'POST_MBS_DATA':
            if(action.post == 'new'){
                
                let newState = [...state]
                newState[0].data.push(action.payload)
                   return newState
            }
            if(action.post == 'gather'){
                
                let newState = [...state]
                newState[1].data.push(action.payload)
                   return newState
            }
            if(action.post == 'deliver'){
                
                let newState = [...state]
                newState[2].data.push(action.payload)
                   return newState
            } 
            if(action.post == 'done'){
                
                let newState = [...state]
                newState[3].data.push(action.payload)
                   return newState
                
            }   else return state

            case 'CLEAR_MBS_DATA':
                let clearState = [...state]
                clearState[0].data = []
                clearState[1].data = []
                clearState[2].data = []
                clearState[3].data = []

                return clearState 


        case 'DELETE_MBS_DATA':
            const deleteId = action.payload
            let deleteState = [...state]
            let deleteIndex0 = deleteState[0].data.findIndex(item => item.id === deleteId)
            let deleteIndex1 = deleteState[1].data.findIndex(item => item.id === deleteId)
            let deleteIndex2 = deleteState[2].data.findIndex(item => item.id === deleteId)
            let deleteIndex3 = deleteState[3].data.findIndex(item => item.id === deleteId)
                
            if(deleteIndex0 != -1){
                deleteState[0].data.splice(deleteIndex0,1)
            }
            if(deleteIndex1 != -1){
                deleteState[1].data.splice(deleteIndex1,1)
            }
            if(deleteIndex2 != -1){
                deleteState[2].data.splice(deleteIndex2,1)
            }
            if(deleteIndex3 != -1){
                deleteState[3].data.splice(deleteIndex3,1)
            }
            return deleteState

        default:
            return state;
    }
}

export default mbsReducer