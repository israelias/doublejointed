import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  ProviderProps,
} from "react"
import { StaticQuery, graphql } from "gatsby"

export type EntitiesContextType = {
  entities?: Entity[]
  getEntity: (id: any) => Entity | undefined
  getUrl: (id: any) => string | null
  getName: (id: any) => any
}

export const EntitiesContext = createContext<EntitiesContextType>(undefined!)

const entitiesQuery = graphql`
  query {
    entities: surveyApi {
      entities {
        id
        name
        homepage
        mdn {
          url
        }
      }
    }
  }
`

const findEntity = (entities: Entity[], key: string) =>
  entities.find(({ id, name }) => {
    const lowerCaseKey = key.toLowerCase()
    const idMatch = id.toLowerCase() === lowerCaseKey
    const nameMatch = name.toLowerCase() === lowerCaseKey

    return idMatch || nameMatch
  })

const EntitiesContextProviderInner = (
  props: ProviderProps<EntitiesContextType>
) => {
  const {
    value: { entities },
  } = props
  const getEntity = useCallback(
    id => {
      const entity = findEntity(entities!, id)

      return entity
    },
    [entities]
  )

  const getName = useCallback(
    id => {
      const entity = findEntity(entities!, id)

      return (entity && entity.name) || id
    },
    [entities]
  )

  const getUrl = useCallback(
    id => {
      const entity = findEntity(entities!, id)

      return (entity && entity.homepage) || null
    },
    [entities]
  )

  const value = useMemo(
    () => ({
      getEntity,
      getName,
      getUrl,
    }),
    [getName, getUrl, getEntity]
  )

  return (
    <EntitiesContext.Provider value={value}>
      {props.children}
    </EntitiesContext.Provider>
  )
}

export const EntitiesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <StaticQuery query={entitiesQuery}>
      {({ entities: { entities } }) => (
        <EntitiesContextProviderInner value={entities}>
          {children}
        </EntitiesContextProviderInner>
      )}
    </StaticQuery>
  )
}

export const useEntities = () => useContext(EntitiesContext)
