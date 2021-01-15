import React from 'react';

export type UserContextType = {
    token: string | undefined,
    nickname: string | undefined,
    loginTime: Date | undefined,
    setContext: Function | undefined,
    clear: Function
}

export const defaultValue:UserContextType = {
    token:undefined,
    nickname:undefined,
    loginTime:undefined,
    setContext:undefined,
    clear(){
        Object.keys(defaultValue).forEach((key) => {
            if(!((defaultValue as any)[key] instanceof Function)){
                delete (defaultValue as any)[key]
            }
        })
    }
}

export default React.createContext<UserContextType>(defaultValue);