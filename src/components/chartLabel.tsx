import React, { memo, SVGProps } from "react"
import { useTheme } from "styled-components"

/**
 * This component is used to render a custom label for charts,
 * its main advantage is to add an outline to the labels so
 * they are more legible.
 */

interface ChartLabelProps extends SVGProps<SVGSVGElement> {
  label: string | number
  fontSize?: number
  outlineColor?: string
  textColor?: string
}

const ChartLabel = ({
  label,
  fontSize = 13,
  outlineColor: _outlineColor,
  textColor: _textColor,
  ...rest
}: ChartLabelProps) => {
  const theme = useTheme()

  const outlineColor = _outlineColor || theme.colors.background
  const textColor = _textColor || theme.colors.text

  return (
    <g {...rest}>
      <text
        textAnchor="middle"
        dominantBaseline="central"
        stroke={outlineColor}
        strokeWidth={4}
        strokeLinejoin="round"
        style={{
          pointerEvents: "none",
          fontSize,
          fontWeight: 600,
          opacity: 1,
        }}
      >
        {label}
      </text>
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={textColor}
        style={{
          pointerEvents: "none",
          fontSize,
          fontWeight: 600,
        }}
      >
        {label}
      </text>
    </g>
  )
}

export default memo(ChartLabel)
