import React, { memo, useMemo } from "react"
import { useTheme } from "styled-components"
import { ResponsiveChoroplethCanvas } from "@nivo/geo"
import countries from "data/geo/world_countries"
import ParticipationByCountryTooltip from "./ParticipationByCountryTooltip"

const features = countries.features.map(feature => {
  return {
    ...feature,
    id: feature.id,
  }
})

const chartLegends = [
  {
    anchor: "bottom-left",
    direction: "column",
    translateX: 30,
    translateY: -30,
    itemsSpacing: 0,
    itemWidth: 100,
    itemHeight: 18,
    itemDirection: "left-to-right",
    symbolSize: 18,
    justify: true,
  },
]

interface ParticipationByCountryChartProps {
  units: "count" | "percentage"
  data: {
    id: string
    count: number
    percentage: number
  }[]
}

const ParticipationByCountryChart = ({
  units,
  data,
}: Partial<ParticipationByCountryChartProps>) => {
  const theme = useTheme()

  const mergedTheme = {
    ...theme.charts,
    // background: theme.colors.backgroundAlt,
  }

  const colorRange = theme.colors.countries

  const formatValue = useMemo(() => {
    if (units === "percentage") return (v: number) => `${v.toFixed(1)}%`
    return (v: number) => Math.round(v)
  }, [units])

  return (
    <ResponsiveChoroplethCanvas
      features={features}
      data={data}
      value={units}
      valueFormat={formatValue}
      domain={units === "percentage" ? [0, 8] : [0, 1000]}
      colors={colorRange}
      unknownColor={theme.colors.backgroundAlt}
      projectionScale={118}
      projectionTranslation={[0.5, 0.7]}
      projectionRotation={[-11, 0, 0]}
      theme={mergedTheme}
      borderWidth={0.5}
      borderColor={{ theme: "background" }}
      animate={false}
      legends={chartLegends}
      tooltip={ParticipationByCountryTooltip}
    />
  )
}

export default memo(ParticipationByCountryChart)
