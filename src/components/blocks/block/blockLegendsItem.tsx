import React from "react"
import styled, { css, DefaultTheme } from "styled-components"
import { spacing } from "../../../theme"

interface BlockLegendsItemProps {
  id: string | number
  label: string
  shortLabel?: string
  color?: string
  style: object
  chipSize: number
  chipStyle: object
  onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>
  onMouseLeave?: React.MouseEventHandler<HTMLTableRowElement>
  onClick?: React.MouseEventHandler<HTMLTableRowElement>
  current: string | null
  data?: object
  units?: "percentage" | "count"
  layout?: "horizontal" | "vertical"
  useShortLabels?: boolean
}

const LegendsItem = ({
  id,
  label,
  shortLabel,
  color,
  style = {},
  chipSize,
  chipStyle = {},
  onMouseEnter,
  onMouseLeave,
  onClick,
  current,
  data,
  units,
  layout,
  useShortLabels,
}: BlockLegendsItemProps) => {
  const handleMouseEnter = () => {
    if (onMouseEnter === undefined) return
    onMouseEnter({ id, label, color })
  }

  const handleMouseLeave = () => {
    if (onMouseLeave === undefined) return
    onMouseLeave({ id, label, color })
  }

  const handleClick = () => {
    if (onClick === undefined) return
    onClick({ id, label, color })
  }

  const isInteractive = typeof onMouseEnter !== "undefined"

  const state =
    current === null ? "default" : current === id ? "active" : "inactive"

  return (
    <Container
      className={`Legends__Item ${
        shortLabel ? "Legends__Item--withKeyLabel" : ""
      }`}
      style={style}
      isInteractive={isInteractive}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      state={state}
    >
      {color && (
        <ChipWrapper layout={layout}>
          <Chip
            style={{
              width: chipSize,
              height: chipSize,
              background: color,
              ...chipStyle,
            }}
          />
        </ChipWrapper>
      )}
      {!color && shortLabel && (
        <KeyLabel layout={layout} className="Legends__Item__KeyLabel">
          {shortLabel}{" "}
        </KeyLabel>
      )}
      <Label
        layout={layout}
        className="Legends__Item__Label"
        dangerouslySetInnerHTML={{
          __html: useShortLabels ? shortLabel || label : label,
        }}
      />
      {data && (
        <Value layout={layout} className="Legends__Item__Value">
          {units === "percentage" ? `${data[units]}%` : data[units]}
        </Value>
      )}
    </Container>
  )
}

const Container = styled.tr.attrs(
  ({
    isInteractive = false,
    state = "default",
    theme,
  }: {
    isInteractive: boolean
    state: "default" | "active" | "inactive"
    theme: DefaultTheme
  }) => ({
    isInteractive,
    state,
    theme,
  })
)`
  cursor: default;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ isInteractive, theme }) => {
    if (isInteractive) {
      return css`
        cursor: pointer;
        &:hover {
          background: ${theme.colors.backgroundAlt};
        }
      `
    }
  }}

  ${({ state, theme }) => {
    if (state === "active") {
      return css`
        /* background: ${theme.colors.backgroundAlt}; */
      `
    } else if (state === "inactive") {
      return css`
        opacity: 0.25;
      `
    }
  }}
`

const ChipWrapper = styled.th.attrs(
  ({ layout }: { layout: "horizontal" | "vertical" }) => ({
    layout,
  })
)`
  padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
`
const Chip = styled.div.attrs(
  ({ layout }: { layout: "horizontal" | "vertical" }) => ({
    layout,
  })
)``

const KeyLabel = styled.th.attrs(
  ({ layout }: { layout: "horizontal" | "vertical" }) => ({
    layout,
  })
)`
  padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
  text-align: left;
`

const Label = styled.td.attrs(
  ({ layout }: { layout: "horizontal" | "vertical" }) => ({
    layout,
  })
)`
  padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
  width: 100%;
`

const Value = styled.td.attrs(
  ({ layout }: { layout: "horizontal" | "vertical" }) => ({
    layout,
  })
)`
  padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
`

export default LegendsItem
