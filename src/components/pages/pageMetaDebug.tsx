import React from "react"
import { usePageContext } from "../../context/page.context"
import { useI18n } from "../i18n/i18nContext"
import Debug from "../debug"
import { getPageSocialMeta } from "../../helpers/page.helpers"
// import { useTools } from 'core/helpers/toolsContext'

const PageMetaDebug = ({ overrides = {} }) => {
  const context = usePageContext()
  const { translate } = useI18n()
  // const { getToolName } = useTools()

  if (!context.isDebugEnabled) return null

  // const toolName = getToolName(context)
  // if (toolName) {
  //     overrides.title = `${websiteTitle}: ${toolName}`
  // }

  const meta = getPageSocialMeta(context, translate, overrides)
  const metaObject = meta.reduce((acc, meta) => {
    const key = meta.property || meta.name

    return {
      ...acc,
      [key]: meta.content,
    }
  }, {})

  return <Debug title="Page meta" data={metaObject} />
}

export default PageMetaDebug
