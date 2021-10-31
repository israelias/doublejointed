import React, { memo, useState, useMemo } from "react"
import { useTheme } from "styled-components"
import { keys } from "../../../bucket_keys"
import Block from "..//block/Block"
import GaugeBarChart from "../../charts/generic/GaugeBarChart"
import ChartContainer from "../../charts/ChartContainer"

const GenderBlock = ({
  block,
  data,
}: {
  block: BlockProps
  data: { buckets: { id: string }[] }
}) => {
  const { units: defaultUnits = "percentage" } = block
  const [units, setUnits] = useState(defaultUnits)
  const theme = useTheme()

  const colorMapping = useMemo(
    () =>
      keys.gender.keys.map(item => ({
        ...item,
        color: theme.colors.ranges.gender[item.id],
      })),
    [theme]
  )

  return (
    <Block units={units} setUnits={setUnits} data={data.buckets} block={block}>
      <ChartContainer height={200} fit={true}>
        <GaugeBarChart
          units={units}
          buckets={data.buckets}
          colorMapping={colorMapping}
          i18nNamespace="options.gender"
        />
      </ChartContainer>
    </Block>
  )
}

export default memo(GenderBlock)
