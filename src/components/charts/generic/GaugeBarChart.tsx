import React, { memo, useMemo } from "react"
import { useTheme } from "styled-components"
import { ResponsiveBar } from "@nivo/bar"
import { useTheme as useNivoTheme } from "@nivo/core"
import { Chip } from "@nivo/tooltip"
import ChartLabel from "../../chartLabel"

export interface BarType {
  id: string

  width: number
  height: number
  x: number
  y: number
  color?: string
  data: any
  key: string
}

// Custom labels using an extra `layer`,
// this way, we can add an extra outline to bar labels
const getLabels =
  (units: "percentage" | "count") =>
  ({ bars }: { bars: BarType[] }) => {
    return bars.map(bar => {
      let deltaLabel = ""

      // skip legend for small bars
      if (bar.width < 60) return null

      // only keep 1 decimal
      let value: number | string = Math.round(bar.data.value * 10) / 10

      if (units === "percentage") value = `${value}%`

      // delta is not shown right now
      // const deltaValue = bar.data.data[`${bar.data.id}_${units}Delta`]
      // if (typeof deltaValue !== 'undefined' && deltaValue !== null) {
      //     deltaLabel = deltaValue > 0 ? `+${deltaValue}` : deltaValue
      //     if (units === 'percentage') deltaLabel = `${deltaLabel}%`
      //     deltaLabel = `(${deltaLabel})`
      // }

      // `pointerEvents: none` is used to not
      // disturb mouse events
      return (
        <ChartLabel
          key={bar.key}
          label={`${value} ${deltaLabel}`}
          transform={`translate(${bar.x + bar.width / 2},${
            bar.y + bar.height / 2
          })`}
          style={{ pointerEvents: "none" }}
        />
      )
    })
  }

const Tooltip = memo(
  ({
    i18nNamespace,
    bar,
    units,
  }: {
    i18nNamespace: string
    bar: BarType
    units: "percentage" | "count"
  }) => {
    const theme = useNivoTheme()

    return (
      <div style={theme.tooltip.container}>
        <div style={theme.tooltip.basic}>
          <Chip color={bar.color} style={{ marginRight: 7 }} />
          {`${i18nNamespace}.${bar.id}`}:{" "}
          <strong>
            {bar.data[`${bar.id}_${units}`]}
            {units === "percentage" && "%"}
          </strong>
        </div>
      </div>
    )
  }
)

const GaugeBarChart = ({
  buckets,
  colorMapping,
  units,
  applyEmptyPatternTo,
  i18nNamespace,
}: {
  buckets: {
    id: string
    count: number
    percentage: number
    countDelta?: number
    percentageDelta?: number
  }[]
  colorMapping: { id: string; color: string }[]
  units: "percentage" | "count"
  applyEmptyPatternTo?: string
  i18nNamespace: string
}) => {
  const theme = useTheme()

  const keys = useMemo(() => colorMapping.map(m => m.id), [colorMapping])
  const data = useMemo(
    () => [
      buckets.reduce((acc, bucket) => {
        return {
          ...acc,
          [bucket.id]: bucket[units],
          [`${bucket.id}_count`]: bucket.count,
          [`${bucket.id}_percentage`]: bucket.percentage,
          [`${bucket.id}_countDelta`]: bucket.countDelta,
          [`${bucket.id}_percentageDelta`]: bucket.percentageDelta,
        }
      }, {}),
    ],
    [buckets, units]
  )

  const colors = useMemo(() => {
    const colorById = colorMapping.reduce(
      (acc: any, m: any) => ({
        ...acc,
        [m.id]: m.color,
      }),
      {}
    )

    return (bar: BarType) => colorById[bar.id]
  }, [colorMapping])
  const labelsLayer = useMemo(() => getLabels(units), [units])
  const patternRules = useMemo(
    () => [
      {
        id: "empty",
        match: { id: applyEmptyPatternTo },
      },
    ],
    [applyEmptyPatternTo]
  )

  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      layout="horizontal"
      indexBy={() => "serie"}
      colors={colors}
      enableLabel={false}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 1.4]],
      }}
      axisLeft={null}
      axisBottom={null}
      enableGridX={false}
      enableGridY={false}
      animate={false}
      theme={theme.charts}
      layers={["bars", labelsLayer]}
      defs={[theme.charts.emptyPattern]}
      fill={patternRules}
      tooltip={(bar: BarType) => (
        <Tooltip bar={bar} i18nNamespace={i18nNamespace} units={units} />
      )}
    />
  )
}

export default GaugeBarChart
