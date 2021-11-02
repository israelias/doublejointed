import { getPageLabel } from "../../helpers/page.helpers"
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
