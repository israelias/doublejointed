import React, { memo } from "react"
import styled from "styled-components"
import { spacing } from "../../../theme"
// import { useI18n } from "core/i18n/i18nContext"
// import T from "core/i18n/T"

const BlockNote = ({ block }: { block: BlockProps }) => {
  // const { translate } = useI18n()
  // for "_others" blocks (freeform answers), replace suffix with ".others"
  const blockId = block.id && block.id.replace("_others", ".others")
  const key = `blocks.${block.blockName || blockId}.note`
  // const blockNote = translate(key, {}, null)
  const blockNote = key || null
  if (blockNote) {
    return (
      <Note className="Block__Note">
        {/* <T k={key} md={true} /> */}
        Fucking block note
      </Note>
    )
  } else {
    return null
  }
}

const Note = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${spacing()};
  margin-top: ${spacing(2)};
  font-size: ${props => props.theme.typography.size.small};
  p,
  ul,
  ol {
    &:last-child {
      margin: 0;
    }
  }
`

export default memo(BlockNote)
