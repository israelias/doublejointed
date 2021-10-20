import React from "react"
import { usePageContext } from "../../context/page.context"
import { getBlockMeta } from "../../helpers/block.helpers"
import Debug from "../debug"

import { Block } from "../blocks/types"

const ShareBlockDebug = ({ block }: { block: Block }) => {
  const context = usePageContext()
  const translate = () => "shareblockdebug"
  const title = "Block sharing"

  if (!context.isDebugEnabled) return null

  const meta = getBlockMeta(block, context, translate, title)

  return <Debug title={title} data={meta} />
}

export default ShareBlockDebug
