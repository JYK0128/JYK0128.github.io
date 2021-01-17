import React from 'react';

export type UserContextType = {
    token: string | undefined,
    nickname: string | undefined,
    loginTime: Date | undefined,
    setContext: Function | undefined,
    clear: Function | undefined
}

export const defaultValue:UserContextType = {
    token:undefined,
    nickname:undefined,
    loginTime:undefined,
    setContext:undefined,
    clear:undefined
}

export default React.createContext<UserContextType>(defaultValue);