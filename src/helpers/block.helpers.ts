import get from 'lodash/get'
// import config from '../../config'
// import { GatsbyNode } from "gatsby"



// const { siteTitle, capturesUrl, hashtag, year } = config
export const SITEURL = "https://2020.stateofjs.com"
export const SITETITLE = "State of JS 2020"
export const CAPTURESURL = "https://stateofx-images.netlify.app/captures/js2020"
export const SOCIALMEDIAIMAGE = "stateofjs2020_socialmedia.png"
export const HASHTAG = "#StateOfJs"
export const YEAR = 2020

interface BlockHelperProps { 
    block: BlockProps,
    page: Page
    capturesUrl?: string
    siteTitle?: string
    hashtag?: string
    year?: number
    title?: string;
}

export const getBlockTitleKey = ({ block, page }: BlockHelperProps ) => {
    const { blockName, titleId } = block
    if (titleId) {
        return titleId
    } else if (blockName) {
        return `blocks.${blockName}.title`
    } else {
        const pageId = page.i18nNamespace || block.pageId || page.id
        const blockId = block?.id?.replace('_others', '.others')
        return `${pageId}.${blockId}`
    }
}

export const getBlockDescriptionKey = ({ block, page }: BlockHelperProps) => {
    const { blockName, descriptionId } = block
    if (descriptionId) {
        return descriptionId
    } else if (blockName) {
        return `blocks.${blockName}.description`
    } else {
        const pageId = page.i18nNamespace || block.pageId || page.id
        const blockId = block?.id?.replace('_others', '.others')
        return `${pageId}.${blockId}.description`
    }
}

export const getBlockTitle = ({ block, page }: BlockHelperProps) => {
    return block.title || getBlockTitleKey({ block, page })
}

export const getBlockDescription = ({ block, page }: BlockHelperProps) => {
    return block.description || getBlockDescriptionKey({ block, page })
}

export const getBlockImage = ({ block, page }: BlockHelperProps) => {
    return `${CAPTURESURL}${get(page, 'locale.path')}/${block.id}.png`
}

export const getBlockMeta = ({ block, page, title, hashtag, year, siteTitle } : BlockHelperProps) => {
    const { id } = block
    const link = `${page.host}${page.currentPath}${id}`
    const trackingId = `${page.currentPath}${id}`.replace(/^\//, '')

    const blockTitle = title || getBlockTitle({ block, page })

    const imageUrl = getBlockImage({ block, page })

    const values = {
        blockTitle,
        link,
        hashtag,
        year,
        siteTitle,
    }

    const twitterText = `#StateOfJS 2019: ${values.blockTitle} ${values.link}`

    const emailSubject = `State Of JavaScript Survey Results`

    const emailBody = `Here are some interesting JavaScript survey results (${values.blockTitle}): ${values.link}`

    return {
        link,
        trackingId,
        title,
        twitterText,
        emailSubject,
        emailBody,
        imageUrl,
    }
}

export const getAllBlocks = ({sitemap}: { sitemap: { contents: Page[] } }) => {
    let allBlocks: BlockProps[] | undefined;
    sitemap.contents.forEach((page) => {
        allBlocks = page.blocks && [...allBlocks!, ...page.blocks]
        if (page.children) {
            page.children.forEach((page) => {
                allBlocks = page.blocks && [...allBlocks!, ...page.blocks]
            })
        }
    })
    return allBlocks
}
