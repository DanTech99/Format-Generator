import {createContext} from 'react'

export const appContex = createContext()

export default function AppContextsProvider(props) {
  return (
    <AppContex.Provider>
        {props.children}
    </AppContex.Provider>
  )
}
