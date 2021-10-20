import React from "react"
import blockRegistry, {
  BlockType,
} from "../../../helpers/blockRegistry.helpers"
import { BucketKeysNameType } from "../../../bucket_keys"
import isEmpty from "lodash/isEmpty"
import Block from "./block"
import get from "lodash/get"
import { usePageContext } from "../../../context/page.context"

export interface Block {
  id: string
  blockType: BlockType
  // key used to pick the block's data from the page's data
  dataPath?: string
  // key used to pick bucket keys
  bucketKeysName?: BucketKeysNameType
  // enable/disable block description
  showDescription?: boolean
  // which mode to use for generic bar charts
  mode?: "absolute" | "relative"
  // which unit to use for generic bar charts
  units?: "percentage" | "count"
  //Extra
  hidden?: boolean
  // BLOCK NOTE props and BLOCKTITLE props
  title?: React.ReactNode
  titleId?: string
  description?: React.ReactNode
  descriptionId?: string
  // TITLECONTENTS props
  titleLink?: string
  enableDescriptionMarkdown?: boolean
}

interface BlockSwitcherProps {
  block: Block
  pageData: any
  index?: number
}

const BlockSwitcher = ({
  pageData,
  block,
  index,
  ...props
}: BlockSwitcherProps) => {
  const pageContext = usePageContext()
  const { id, blockType, hidden } = block

  let blockData
  if (!blockRegistry[blockType]) {
    return (
      <BlockError
        block={block}
        message={`Missing Block Component! Block ID: ${id} | type: ${blockType}`}
      />
    )
  }

  const BlockComponent = blockRegistry[blockType]
  if (block.dataPath) {
    blockData = get(pageData, block.dataPath)
    if (!blockData || blockData === null || isEmpty(blockData)) {
      return (
        <BlockError
          block={block}
          message={`No available data for block ${id} | path: ${block.dataPath} | type: ${blockType}`}
        />
      )
    }
  }
  return hidden && !pageContext.isCapturing ? null : (
    <BlockComponent block={block} data={blockData} index={index} {...props} />
  )
}

class ErrorBoundary extends React.Component {
  state = {}
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    const { block, pageData } = this.props
    const { error } = this.state
    if (error) {
      return (
        <BlockError
          block={block}
          message={error.message}
          data={get(pageData, block.dataPath)}
        />
      )
    }
    return this.props.children
  }
}

interface BlockErrorProps {
  message: string
  data: { [key: string]: string }
  block: Block
}

const BlockError = ({ message, data, block }: BlockErrorProps) => (
  <Block block={block}>
    <div className="error">{message}</div>
    {data && !isEmpty(data) && (
      <pre className="error error-data">
        <code>{JSON.stringify(data, "", 2)}</code>
      </pre>
    )}
  </Block>
)

type BlockSwitcherWithBoundaryProps = BlockErrorProps & BlockSwitcherProps

const BlockSwitcherWithBoundary = (props: BlockSwitcherWithBoundaryProps) => (
  <ErrorBoundary {...props}>
    <BlockSwitcher {...props} />
  </ErrorBoundary>
)

export default BlockSwitcherWithBoundary
