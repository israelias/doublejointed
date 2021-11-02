import React from "react"
import { Redirect, useLocation } from "@reach/router"
import { getBlockTitle, getBlockDescription } from "../../helpers/block.helpers"
import { mergePageContext } from "../../helpers/page.helpers"
import PageMeta from "../pages/pageMeta"
import PageMetaDebug from "../pages/pageMetaDebug"
import config from "../../config/config.yml"
import { usePageContext } from "../../context/page.context"

const ShareBlockTemplate = () => {
  const pageContext = usePageContext()
  const { block } = pageContext
  const location = useLocation()
  const context = mergePageContext(pageContext, location, {})
  const translate = () => {}

  const blockTitle = getBlockTitle(block, context, translate)
  const blockDescription = getBlockDescription(
    context.block,
    context,
    translate
  )
  const overrides = {
    title: `${config.siteTitle}: ${blockTitle} ${config.hashtag}`,
  }
    
  if (blockDescription) {
    overrides.description = blockDescription
  }

  return (
    <div className="template">
      <PageMeta overrides={overrides} />
      <PageMetaDebug overrides={overrides} />
      {!context.isDebugEnabled && <Redirect to={context.redirect} noThrow />}
      Redirecting…
    </div>
  )
}

export default ShareBlockTemplate
