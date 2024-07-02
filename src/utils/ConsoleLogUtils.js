const isDebug = true

export const log = (key,msg) =>{
    if(isDebug){
        console.log(key,msg)
    }
}

export const warn = (key, msg) => {
    if (isDebug) {
        console.warn(key, msg)
    }
}

export const errorConsoleLog = (key, msg) =>{
    if (isDebug) {
        console.error(key, msg)
    }
}