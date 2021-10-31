import React, { memo } from "react"
import PropTypes from "prop-types"
import ButtonGroup from "../../buttonGroup"
import Button from "../../button"
import T from "core/i18n/T"

interface BlockUnitsSelectorProps {
  units: "percentage" | "count"
  onChange: () => void
}
const BlockUnitsSelector = ({ units, onChange }: BlockUnitsSelectorProps) => {
  return (
    <ButtonGroup>
      <Button
        size="small"
        className={`Button--${
          units === "percentage" ? "selected" : "unselected"
        }`}
        onClick={() => onChange("percentage")}
      >
        <T k="chart_units.percentage" />
      </Button>
      <Button
        size="small"
        className={`Button--${units === "count" ? "selected" : "unselected"}`}
        onClick={() => onChange("count")}
      >
        <T k="chart_units.count" />
      </Button>
    </ButtonGroup>
  )
}

export default memo(BlockUnitsSelector)
