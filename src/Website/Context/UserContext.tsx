import React from 'react';

export type UserContextType = {
    token: string | undefined,
    nickname: string | undefined,
    setContext: Function | undefined
}

// default value is for unit test
export default React.createContext<UserContextType>({
    token:undefined,
    nickname:undefined,
    setContext:undefined
});