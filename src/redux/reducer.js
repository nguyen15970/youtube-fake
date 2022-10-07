
const initState = {
    video: {},
    search:'',
    listVideo:[]
  };

const rootReducer = (state = initState, action) => {
    console.log({ state }, { action });

    switch (action.type) {
      case "WATCH_VIDEO":
        return {
          ...state,
          video:action.payload
        };
        // case "Addtocart":
        //   return {
        //     ...state,
        //     listCart:[
        //       ...state.listCart,action.payload
        //     ]
        // };
        case "TEXT__SEARCH":
          return{
            ...state,
            search:action.payload
          }

        case "SEARCH__VIDEO":
          return{
            ...state,
            video:action.payload
          }
        case "LIST__VIDEO":
          return{
            ...state,
            listVideo:action.payload
          }
    
        default:
          return state;
    }
};
    
  export default rootReducer