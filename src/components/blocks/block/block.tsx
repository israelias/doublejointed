import React, { memo } from "react"
import styled from "styled-components"
import { mq, spacing } from "../../../theme"
import BlockTitleOriginal, { BlockTitleProps } from "./blockTitle"
import BlockNote from "./blockNote"
import ShareBlockDebug from "../../share/shareBlockDebug"
import BlockLegends, { BlockLegendsProps } from "./blockLegends"

export interface BlockComponentProps {
  block: BlockProps
  showDescription?: boolean
  isShareable?: boolean
  className?: string
  values?: object
  // different
  children?: React.ReactNode
  units?: "percentage" | "count"
  setUnits?: React.Dispatch<React.SetStateAction<"percentage" | "count">>
  legendProps?: BlockLegendsProps
  error?: {}
  data?: any
  titleProps?: BlockTitleProps
  blockFooter?: any
  title?: string
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
          // block={block}
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
          // block={block}
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

export default memo(Block)
