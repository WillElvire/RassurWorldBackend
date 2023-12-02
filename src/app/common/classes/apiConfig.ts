export const getApiPath = (url : string) => {
    return process.env.BIZAO_BASE_URL +"/" +  url
}

export const generateId = ()=> {
    return "tr" + Math.floor(500000) +""+ new Date().getTime();
}