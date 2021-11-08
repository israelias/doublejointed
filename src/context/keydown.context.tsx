import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ProviderProps,
  KeyboardEvent,
} from "react"

export type KeyDownContextType = {
  modKeyDown: boolean
  downHandler?: ({ key }: { key: any }) => void
  upHandler?: ({ key }: { key: any }) => void
}

const KeydownContext = createContext<KeyDownContextType>(undefined!)

const targetKey = "Alt"

const KeydownContextProviderInner = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [modKeyDown, setModKeyDown] = useState(false)
  // const value = {
  //   modKeyDown,
  // }

  const downHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setModKeyDown(true)
    }
  }

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setModKeyDown(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return (
    <KeydownContext.Provider value={{ modKeyDown }}>
      <div className={modKeyDown ? "modKeyDown" : "modKeyUp"}>{children}</div>
    </KeydownContext.Provider>
  )
}

export const KeydownContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <KeydownContextProviderInner>{children}</KeydownContextProviderInner>
}

export const useKeydownContext = () => useContext(KeydownContext)
