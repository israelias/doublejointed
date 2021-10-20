import  {
    BlockType,
} from "../../helpers/blockRegistry.helpers"
import { BucketKeysNameType } from "../../bucket_keys"
  
export interface BlockContext<
    BlockTemplate,
    BlockType,
    PageVariables = unknown,
    BlockVariables = unknown
> {
    // unique identifier of the block, should be unique
    // for the whole survey
    id: string
    blockName: string
    // define the block implementation to use, defined in
    // `/src/core/helpers/blockRegistry.js`
    blockType: BlockType
    // URI of the block
    path: string
    // Unique identifier for the block's page
    pageId: string
    // GraphQL query for the block
    query: string
    // Template of the block, available templates being defined
    // in `/config/block_templates.yml`
    template: BlockTemplate
    // Injected variables for the block's page
    pageVariables: PageVariables
    // Injected variables for the block
    variables: BlockVariables
    enableExport: boolean
    showLegend: boolean
}

export interface Block {
    id: string
    blockType: BlockType
    // key used to pick the block's data from the page's data
    dataPath?: string
    // key used to pick bucket keys
    bucketKeysName?: BucketKeysNameType
    // enable/disable block description
    showDescription?: boolean
    // which mode to use for generic bar charts
    mode?: "absolute" | "relative"
    // which unit to use for generic bar charts
    units?: "percentage" | "count"
    //Extra
    hidden?: boolean
    // BLOCK NOTE props and BLOCKTITLE props
    title?: React.ReactNode
    titleId?: string
    description?: React.ReactNode
    descriptionId?: string
    // TITLECONTENTS props
    titleLink?: string
    enableDescriptionMarkdown?: boolean
    // BLOCK Main props
    overrides?: Overrides
    showNote?: boolean
    showTitle?: boolean
    legendPosition?: string
    showLegend?: boolean
    // BLOCKEXPORT props
    query: string
}
  
export type Overrides = {
    BlockTitle: string
  

}