import { combineReducers } from "redux";
import domainReducer from "./domain";
import filtersReducer from "./filter";
import selectedReducer from "./selected";
import mbsReducer from "./mbs";
import hesedReducer from "./hesed";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConifg = {
    key: 'log',
    storage,
    whitelist: ['Domain','Filters','Selected','Mbs','Hesed']
}

const rootReducer = combineReducers({
    Domain: domainReducer,
    Filters: filtersReducer,
    Selected: selectedReducer,
    Mbs: mbsReducer,
    Hesed: hesedReducer,
    // CitysalData: citysalDataReducer

})

export default persistReducer(persistConifg, rootReducer);