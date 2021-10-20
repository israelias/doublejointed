import React, { memo } from "react"
import styled from "styled-components"
import { mq, spacing } from "../../../theme"
import BlockTitleOriginal from "./blockTitle"
import BlockNote from "./blockNote"
import ShareBlockDebug from "../../share/shareBlockDebug"
import BlockLegends from "./blockLegends"

import type { Block as BlockType } from "../types"

const Container = styled.div`
  @media ${mq.small} {
    margin-bottom: ${spacing(2)};
  }

  @media ${mq.mediumLarge} {
    margin-bottom: ${spacing(4)};
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export interface BlockComponentProps {
  block: BlockType
  showDescription: boolean
  isShareable: boolean
  className?: string
  values?: object
  // different
  children?: React.ReactNode
}

const Block = ({
  isShareable,
  className,
  children,
  units,
  setUnits,
  error,
  data,
  block,
  legendProps,
  titleProps,
  blockFooter = null,
}: BlockComponentProps) => {
  const {
    id,
    showLegend,
    legendPosition = "bottom",
    showTitle = true,
    showNote = true,
    overrides,
  } = block

  const BlockTitle = overrides?.BlockTitle || BlockTitleOriginal

  return (
    <Container
      id={id}
      className={`Block Block--${id}${
        className !== undefined ? ` ${className}` : ""
      }`}
    >
      {showTitle && (
        <BlockTitle
          isShareable={isShareable}
          units={units}
          setUnits={setUnits}
          data={data}
          block={block}
          {...titleProps}
        />
      )}
      {isShareable && <ShareBlockDebug block={block} />}
      {showLegend && legendPosition === "top" && (
        <BlockLegends
          block={block}
          data={data}
          units={units}
          position={legendPosition}
          {...legendProps}
        />
      )}
      <div className="Block__Contents">
        {error ? <div className="error">{error}</div> : children}
      </div>
      {showLegend && legendPosition === "bottom" && (
        <BlockLegends
          block={block}
          data={data}
          units={units}
          position={legendPosition}
          {...legendProps}
        />
      )}
      {showNote && <BlockNote block={block} />}
      {blockFooter}
    </Container>
  )
}

export default memo(Block)
