interface BlockContext<
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


// id: ${parentId}_resources
// blockName: recommended_resources
// blockType: RecommendedResourcesBlock
// showDescription: false

// # featuresPageTemplate:
// #     blocks:
// #         - id: features_introduction
// #           template: pageIntroductionTemplate
// #           variables:
// #               pageId: '${id}'

// #         - id: ${id}_featuresOverview
// #           template: featuresOverviewTemplate
// #           blockName: featuresOverview

// #         - id: knowledge_score
// #           template: knowledgeScoreTemplate