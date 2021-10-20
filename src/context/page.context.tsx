import React, { createContext, useContext, ProviderProps } from "react"
import { BlockContext } from "../components/blocks/types"

export type PageContextType = {
  next: {
    id: string
    path: string
  }
  previous: {
    id: string
    path: string
  }
  block: BlockContext<BlockType, BlockVariables>
  blocks?: {
    block: string
    pageData: {}
  }[]
  isDebugEnabled: boolean
  isCapturing?: boolean
  redirect: string
}

const pageContext = createContext<PageContextType>(undefined!)

export const PageContextProvider = (props: ProviderProps<PageContextType>) => {
  return (
    <pageContext.Provider value={props.value}>
      {props.children}
    </pageContext.Provider>
  )
}

export const usePageContext = () => useContext(pageContext)
