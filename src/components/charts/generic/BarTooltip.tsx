import React, { memo } from "react"
import { useTheme } from "@nivo/core"
import { useEntities } from "../../../context/entities.context"

/**
 * This tooltip can be used for general bar charts:
 * - HorizontalBarChart
 * - VerticalBarChart
 */

interface BarTooltipProps {
  indexValue: string | number
  data: {
    percentage: number
    count: number
  }
  i18nNamespace: string
  shouldTranslate: boolean
}

const BarTooltip = ({
  indexValue,
  data,
  i18nNamespace,
  shouldTranslate,
}: BarTooltipProps) => {
  const { getName } = useEntities()

  const label = shouldTranslate
    ? `options.${i18nNamespace}.${indexValue}`
    : getName(indexValue)
  const nivoTheme = useTheme()

  return (
    <div style={{ ...nivoTheme.tooltip.container, maxWidth: 300 }}>
      {label}:&nbsp;
      <strong>{data.percentage}%</strong>
      &nbsp;({data.count})
    </div>
  )
}

export default memo(BarTooltip)
