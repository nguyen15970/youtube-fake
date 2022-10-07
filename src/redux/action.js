export const getChannelImg = (data) => {
    return{
        type:'GET__CHANNELIMG',
        payload:data
    }
}



export const watchVideo = (data) => {
    return{
        type:'WATCH_VIDEO',
        payload:data
    }
}
export const textSearch = (data) => {
    return{
        type:'TEXT__SEARCH',
        payload:data
    }
}
export const searchVideo = (data) => {
    return{
        type:'SEARCH__VIDEO',
        payload:data
    }
}

export const listVideo = (data) => {
    return{
        type:'LIST__VIDEO',
        payload:data
    }
}