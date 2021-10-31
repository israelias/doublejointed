import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { spacing, fontSize } from '../../../theme'



interface HeatmapChartRowProps
{
    item: {
        id: string
        ranges: { range: string, count: number: percentage: number}[]
    }
    keys: string[]
    index: number
    backgroundColorScale: () => void
    setCurrent: () => void
    isInactive: boolean
    isEven: boolean
}

const HeatmapChartRow = ({
    item,
    keys,
    index,
    backgroundColorScale,
    setCurrent,
    isActive,
    isInactive,
    isEven,
}: HeatmapChartRowProps) => {
    const onMouseEnter = useCallback(() => setCurrent(index), [setCurrent, index])
    const onMouseLeave = useCallback(() => setCurrent(null), [setCurrent])

    return (
        <>
            <LabelCell
                isEven={isEven}
                isActive={isActive}
                isInactive={isInactive}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {get(item, 'entity.name', item.id)}
            </LabelCell>
            {keys.map((keyId) => {
                const cell = item.ranges.find((r) => r.range === keyId)

                return (
                    <ValueCell
                        key={keyId}
                        isActive={isActive}
                        isInactive={isInactive}
                        style={{
                            background: backgroundColorScale((cell && cell.percentage) || 0),
                        }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        {(cell && cell.percentage) || 0}%
                    </ValueCell>
                )
            })}
        </>
    )
}



const Cell = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    transition: opacity 200ms;
    opacity: ${({ isInactive }) => (isInactive ? 0.3 : 1)};
`

const LabelCell = styled(Cell)`
    font-size: ${fontSize('smallish')};
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 ${spacing(0.5)};
    background: ${({ isEven, isActive, theme }) => {
        if (isEven || isActive) return theme.colors.backgroundAlt
        return undefined
    }};
`

const ValueCell = styled(Cell)`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.background};
    font-size: ${fontSize('smaller')};
    justify-content: center;
`

export default memo(HeatmapChartRow)
