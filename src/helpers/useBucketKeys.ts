import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { keys, BucketKeysNameType, BucketKeysConfigType } from '../bucket_keys'
import { useI18n } from 'core/i18n/i18nContext'

export const useBucketKeys = (bucketKeysId: string) => {
    const theme = useTheme()
    const { translate } = useI18n()

    const keysConfig = keys[bucketKeysId]
    if (!keysConfig) {
        throw new Error(`Could not find bucket keys config for: "${bucketKeysId}"`)
    }

    return useMemo(() => {
        let colorRange: string
        // if (keysConfig.colorRange) {
        //     colorRange = theme.colors.ranges[keysConfig.colorRange]
        // }

        return keysConfig.keys.map((key: BucketKeysNameType ) => {
            return {
                id: key.id,
                label: translate(key.label),
                shortLabel: key.shortLabel ? translate(key.shortLabel) : undefined,
                color: colorRange ? colorRange[key.id] : undefined,
            }
        })
    }, [keysConfig, theme, translate])
}
