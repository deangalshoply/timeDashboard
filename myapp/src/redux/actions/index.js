export const getDomain = (DomainData) => {
    return{
        type: 'GET_DOMAIN',
        payload: DomainData
    }
}

export const addFilterData = (FilterData) => {
    return{
        type: 'ADD_FILTER_DATA',
        payload: FilterData
    }
}

export const removeFilterData = (FilterData) => {
    return{
        type: 'REMOVE_FILTER_DATA',
        payload: FilterData
    }
}

export const addFilter = (newFilter) => {
    return{
        type: 'ADD_FILTERS',
        payload: newFilter
    }
}

export const getSelectedFilter = (selectedFilter) => {
    return{
        type: 'GET_SELECTED',
        payload: selectedFilter
    }
}

//MBS
export const fetchMbsData = (ordersData) => {
    return{
        type: 'FETCH_MBS_DATA',
        payload: ordersData
    }
}

export const postMbsData = (newOrder,post) => {
    return{
        type: 'POST_MBS_DATA',
        payload: newOrder,
        post:post
    }
}

export const deleteMbsData = (ordersId) => {
    return{
        type: 'DELETE_MBS_DATA',
        payload: ordersId
    }
}


//HESED

export const fetchHesedData = (ordersData) => {
    return{
        type: 'FETCH_HESED_DATA',
        payload: ordersData
    }
}


export const postHesedData = (newOrder,post) => {
    return{
        type: 'POST_HESED_DATA',
        payload: newOrder,
        post:post
    }
}


export const deleteHesedData = (ordersId) => {
    return{
        type: 'DELETE_HESED_DATA',
        payload: ordersId
    }
}




//CITYSAL
// export const fetchCitysalData = (ordersData) => {
//     return{
//         type: 'FETCH_CITYSAL_DATA',
//         payload: ordersData
//     }
// }

// export const getCitysalData = (ordersData) => {
//     return{
//         type: 'GET_CITYSAL_DATA',
//         payload: ordersData
//     }
// }