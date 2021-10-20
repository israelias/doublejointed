import React from "react"
import Helmet from "react-helmet"
import { usePageContext } from "../../context/page.context"
import { useI18n } from "../i18n/i18nContext"
import { getPageSocialMeta } from "../../helpers/page.helpers"

const PageMeta = ({ overrides = {} }) => {
  const context = usePageContext()
  const { translate } = useI18n()

  const meta = getPageSocialMeta(context, translate, overrides)

  return <Helmet meta={meta} />
}

export default PageMeta
