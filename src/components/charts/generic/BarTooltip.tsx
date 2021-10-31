import React, { memo } from "react"
import PropTypes from "prop-types"
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

BarTooltip.propTypes = {
  indexValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  data: PropTypes.shape({
    percentage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  i18nNamespace: PropTypes.string.isRequired,
  shouldTranslate: PropTypes.bool.isRequired,
}

export default memo(BarTooltip)
