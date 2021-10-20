import { getPageLabel } from "../../helpers/page.helpers"
import { useI18n } from "core/i18n/i18nContext"
// import { useTools } from 'core/helpers/toolsContext'

interface PageLabelProps {
  page: {
    id: string
    path: string
  }
  isContextual: boolean
  includeWebsite: boolean
}

const PageLabel = ({ page, isContextual, includeWebsite }: PageLabelProps) => {
  const { translate } = useI18n()
  // const { getToolName } = useTools()

  return getPageLabel(page, translate, { isContextual, includeWebsite })
}

export default PageLabel
