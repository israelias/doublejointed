import React, { memo } from "react"
import { BasicTooltip } from "@nivo/tooltip"

interface ParticipationByCountryTooltipProps {
  feature: {
    data?: {
      percentage: number
      count: number
    }
    properties: {
      name: string
    }
    color: string
  }
}

const ParticipationByCountryTooltip = ({
  feature,
}: ParticipationByCountryTooltipProps) => {
  if (feature.data === undefined) return null
  return (
    <BasicTooltip
      id={feature.properties.name}
      color={feature.color}
      enableChip={true}
      value={`${feature.data?.percentage.toFixed(1)}% (${Math.round(
        feature.data?.count
      )})`}
    />
  )
}

export default memo(ParticipationByCountryTooltip)
