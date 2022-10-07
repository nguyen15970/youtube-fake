
import { createStore } from "redux";
import rootReducer from './reducer'
import { devToolsEnhancer } from "redux-devtools-extension";


// extension redux
const devToolsEnhancerExtension = devToolsEnhancer()
//--------------- 

const store = createStore(rootReducer,devToolsEnhancerExtension)

export default store