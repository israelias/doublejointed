import React, { memo, useState } from "react"
import Block from "../block/Block"
import ChartContainer from "../../charts/ChartContainer"
import ParticipationByCountryChart from "../../charts/demographics/ParticipationByCountryChart"

const ParticipationByCountryBlock = ({
  block,
  data,
  triggerId,
  units: defaultUnits = "percentage",
}: {
  block: BlockProps
  data: {
    completion: { count: number; percentager: number }
    buckets: { id: string; count: number; percentage: number }[]
  }
  triggerId: string
  units: "percentage" | "count"
}) => {
  const [units, setUnits] = useState(defaultUnits)

  const chartClassName = triggerId
    ? `ParticipationByCountryChart--${triggerId}`
    : ""

  return (
    <Block units={units} setUnits={setUnits} data={data} block={block}>
      <ChartContainer height={600}>
        <div
          style={{ height: "100%" }}
          className={`ParticipationByCountryChart ${chartClassName}`}
        >
          <ParticipationByCountryChart units={units} data={data.buckets} />
        </div>
      </ChartContainer>
    </Block>
  )
}

export default memo(ParticipationByCountryBlock)
