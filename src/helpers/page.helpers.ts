
import get from 'lodash/get'
import { PageProps } from 'gatsby'
// import config from '../config/config.yml'
import { getBlockImage, SITETITLE, CAPTURESURL, SITEURL, SOCIALMEDIAIMAGE } from './block.helpers'

// export const getTranslationValuesFromContext = (context, translate) => {
//     const values = {}
//     if (context.section !== undefined) {
//         values.section = translate(`section.${context.section}`)
//     }
//     if (context.tool !== undefined) {
//         values.tool = getToolName(context.tool, translate)
//     }

//     return values
// }



export const getPageLabelKey = (page: Page) => page.titleId || `sections.${page.id}.title`

export const getPageLabel = (page: Page, { includeWebsite = false } = {}) => {
    let label: string

    label = getPageLabelKey(page)

    if (includeWebsite === true) {
        label = `${SITETITLE}: ${label}`
    }

    return label
}

/**
 * example:
 *   http://2018.stateofjs.com/images/captures/en-US/front-end_overview.png
 */
export const getPageImageUrl = (page: Page) => {
    const baseUrl = `${page.host}/images/`

    let imageUrl
    if (page.block !== undefined) {
        const { block } = page;
        imageUrl = getBlockImage({ block, page })
    } else {
        imageUrl = `${baseUrl}${SOCIALMEDIAIMAGE}`
    }

    return imageUrl
}

export const getPageMeta = (page: Page, description: string, overrides = {}) => {
    const url = `${page.host}${get(page, 'locale.path')}${page.basePath}`
    const imageUrl = getPageImageUrl(page)
    const isRoot = page.path === '/' || page.basePath === '/'
 

    const meta = {
        url,
        title: isRoot
            ? SITETITLE
            : getPageLabel(page, { includeWebsite: true }),
        imageUrl,
        description,
        ...overrides,
    }

    return meta
}

export const getPageSocialMeta = (context: Page, description: string, overrides = {}) => {
    const meta = getPageMeta(context, description, overrides)
    const socialMeta = [
        // facebook
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: meta.url },
        { property: 'og:image', content: meta.imageUrl },
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description },
        // twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image:src', content: meta.imageUrl },
        { name: 'twitter:title', content: meta.title },
        { name: 'twitter:description', content: meta.description },
    ]

    return socialMeta.filter(({ content }) => content !== undefined)
}

/**
 * Merge context generated from `gatsby-node` with runtime context.
 */
export const mergePageContext = (pageContext: Page, location: Window['location'], state: PageProps<Window['location']> ) => {
    const isCapturing =
        location && location.search ? location.search.indexOf('capture') !== -1 : false
    const isDebugEnabled =
        location && location.search ? location.search.indexOf('debug') !== -1 : false

    let host = SITEURL
    if (location && location.host && location.protocol) {
        host = `${location.protocol}//${location.host}`
    }

    return {
        ...pageContext,
        host,
        currentPath: location ? location.pathname : undefined,
        isCapturing,
        isDebugEnabled,
        ...state,
    }
}
