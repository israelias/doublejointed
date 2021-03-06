import React from "react"
import styled, { css } from "styled-components"
import { mq, spacing, fontSize, color } from "../../../theme"
import BlockLegendsItem from "./blockLegendsItem"
import { useBucketKeys } from "../../../helpers/useBucketKeys"

export interface BlockLegendsProps {
  block: BlockProps
  layout: "horizontal" | "vertical"
  withFrame: boolean
  chipSize: number
  style: object
  itemStyle: object
  chipStyle: object
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
  //extra properti
  data?: {}
  units?: "percentage" | "count"
  position?: "top" | "bottom"
  useShortLabels?: boolean
  current: string | null
}

const BlockLegends = ({
  block,
  layout = "horizontal",
  withFrame = true,
  chipSize = 16,
  style = {},
  itemStyle = {},
  chipStyle = {},
  onMouseEnter,
  onMouseLeave,
  onClick,
  data,
  units,
  position,
  useShortLabels = layout === "horizontal",
  current,
}: BlockLegendsProps) => {
  const { id: blockId, bucketKeysName = blockId } = block

  const blockLegends = useBucketKeys(bucketKeysName)

  const rootStyle = { ...style }

  return (
    <Container
      className="Block__Legends"
      style={rootStyle}
      layout={layout}
      withFrame={withFrame}
      position={position}
    >
      <ContainerInner layout={layout}>
        {blockLegends.map(({ id, label, shortLabel, color }) => (
          <BlockLegendsItem
            key={id}
            id={id}
            current={current}
            label={label}
            shortLabel={shortLabel}
            useShortLabels={useShortLabels}
            color={color}
            style={itemStyle}
            chipSize={chipSize}
            chipStyle={chipStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            data={data && Array.isArray(data) && data.find(b => b.id === id)}
            units={units}
            layout={layout}
          />
        ))}
      </ContainerInner>
    </Container>
  )
}

const Container = styled.table.attrs(
  ({
    position,
    layout,
    withFrame,
  }: {
    position: "bottom" | "top"
    layout: "horizontal" | "vertical"
    withFrame: boolean
  }) => ({
    position,
    layout,
    withFrame,
  })
)`
  font-size: ${fontSize("small")};
  /* margin-top: ${spacing()}; */
  margin-top: ${({ position }) => (position === "bottom" ? spacing() : 0)};
  margin-bottom: ${({ position }) => (position === "top" ? spacing() : 0)};
  width: 100%;

  ${withFrame => {
    if (withFrame) {
      return css`
        border: 1px solid ${color("border")};
        padding: ${spacing(0.5)};

        @media ${mq.small} {
          padding: ${spacing(0.5)};
        }
      `
    }
  }}
`

const ContainerInner = styled.tbody.attrs(
  (props: { layout: "horizontal" | "vertical" }) => props
)`
  ${props => {
    if (props.layout === "horizontal") {
      return css`
        @media ${mq.mediumLarge} {
          display: grid;
        }

        @media ${mq.medium} {
          grid-template-columns: 1fr 1fr;
          column-gap: ${spacing()};
        }

        @media ${mq.large} {
          // fit in as many columns as possible as long as they're wider than 150px
          grid-template-columns: repeat(auto-fit, minmax(120px, auto));
          column-gap: ${spacing()};
        }
      `
    }

    if (props.layout === "vertical") {
      return css`
        /* display: flex;
                flex-direction: column;
                justify-content: space-between; */

        @media ${mq.small} {
          margin-top: ${spacing()};
        }
      `
    }
  }}
`

export default BlockLegends
