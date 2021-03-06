import React, { useMemo, useState } from "react"
// import { BlockContext } from 'core/blocks/types'
import { OpinionBucket, OpinionAllYearsData } from "core/survey_api/opinions"
// @ts-ignore
import Block from "core/blocks/block/Block"
// @ts-ignore
import ChartContainer from "core/charts/ChartContainer"
// @ts-ignore
import StreamChart from "core/charts/generic/StreamChart"
// @ts-ignore
import { useBucketKeys } from "core/helpers/useBucketKeys"

const OPINION_BUCKET_KEYS_ID = "opinions"

interface OpinionBlockProps {
  block: BlockContext<"opinionTemplate", "OpinionBlock">
  data: OpinionAllYearsData
  units: "percentage" | "count"
}

export const OpinionBlock = ({
  block,
  data,
  units: defaultUnits = "percentage",
}: OpinionBlockProps) => {
  const { id } = block
  const [units, setUnits] = useState(defaultUnits)
  const [current, setCurrent] = useState<OpinionBucket["id"] | null>(null)
  const bucketKeys: {
    id: OpinionBucket["id"]
    color: string
  }[] = useBucketKeys(OPINION_BUCKET_KEYS_ID)

  // fix potentially undefined buckets
  const normalizedData = useMemo(
    () =>
      data.map(yearData => ({
        ...yearData,
        buckets: bucketKeys.map(({ id }) => {
          const matchingBucket = yearData.buckets.find(
            bucket => bucket.id === id
          )
          if (matchingBucket) {
            return matchingBucket
          }

          return {
            id,
            count: 0,
            percentage: 0,
          }
        }),
      })),
    [data, bucketKeys]
  )

  return (
    <Block
      units={units}
      setUnits={setUnits}
      block={{
        ...block,
        showLegend: true,
        bucketKeysName: OPINION_BUCKET_KEYS_ID,
      }}
      data={data}
      legendProps={{
        onMouseEnter: ({ id }: { id: OpinionBucket["id"] }) => {
          setCurrent(id)
        },
        onMouseLeave: () => {
          setCurrent(null)
        },
      }}
    >
      <ChartContainer height={300} fit={true}>
        <StreamChart
          colorScale={bucketKeys.map(key => key.color)}
          current={current}
          // for opinions only having one year of data, we duplicate the year's data
          // to be able to use the stream chart.
          data={
            normalizedData.length === 1
              ? [normalizedData[0], normalizedData[0]]
              : normalizedData
          }
          bucketKeys={bucketKeys}
          keys={bucketKeys.map(key => key.id)}
          units={units}
          applyEmptyPatternTo={2}
          namespace={id}
        />
      </ChartContainer>
    </Block>
  )
}

export default OpinionBlock
