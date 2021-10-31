// import blockRegistry from '../helpers/blockRegistry.helpers'

type BlockRegistry = {
     // generic chart blocks
     HorizontalBarBlock,
     VerticalBarBlock,
     HeatmapBlock,
 
     // other
     PageIntroductionBlock,
     TextBlock,
     RecommendedResourcesBlock,
     TshirtBlock,
     SurveyIntroBlock,
     AwardBlock,
     ConclusionBlock,
     NewsletterBlock,
     SponsorsBlock,
     PicksBlock,
     TranslatorsBlock,
     NotFoundBlock,
     HintBlock,
     // ReportBlock,
     
     // demographics
     ParticipationByCountryBlock,
     GenderBlock,
 
     // features
     FeatureExperienceBlock,
     FeaturesOverviewBlock,
     KnowledgeScoreBlock,
 
     // tools
     ToolHeaderBlock,
     ToolExperienceBlock,
     ToolsSectionStreamsBlock,
     ToolsExperienceRankingBlock,
     ToolsScatterplotBlock,
     ToolsExperienceMarimekkoBlock,
     SectionToolsCardinalityByUserBlock,
     AllSectionsToolsCardinalityByUserBlock,
     ToolsArrowsBlock,
     ToolsCityscapeBlock,
     // ToolExperienceGraphBlock,
     // ToolsSectionOverviewBlock,
     // ToolsMatricesBlock,
     // ToolsUsageVariationsBlock,
 
     // happiness
     HappinessHistoryBlock,
 
     // opinions
     OpinionBlock,
}

type BlockType = {
    [P in keyof typeof BlockRegistry]: any
};
interface BlockContext<
    BlockTemplate,
    BlockType,
    PageVariables = unknown,
    BlockVariables = unknown
> extends BlockProps {
    // unique identifier of the block, should be unique
    // for the whole survey
    // id: string
    // blockName: string
    // define the block implementation to use, defined in
    // `/src/core/helpers/blockRegistry.js`
    // blockType: BlockType
    // URI of the block
    // path: string
    // Unique identifier for the block's page
    // pageId: string
    // GraphQL query for the block
    // query: string
    // Template of the block, available templates being defined
    // in `/config/block_templates.yml`
    // template: BlockTemplate
    // Injected variables for the block's page
    // pageVariables: PageVariables
    // Injected variables for the block
    // variables: BlockVariables
    //enableExport: boolean
    //showLegend: boolean

    
}

interface BlockProps
{
    // site-wide id
    id?: string
    // a template from which to inherit its properties
    template: BlockTemplate;
    // the name of the block (used for titles, descriptions, etc.)
    blockName?: string;
    // the type of block (which component to use)
    blockType?: BlockType
    // the query used to populate the block's data
    query?: string;
    // key used to pick the block's data from the page's data | the path to use (from the query root) to access the block's data
    dataPath?: string
    // key used to pick bucket keys the name of the block's keys (used for legends, formatting data, etc.)
    bucketKeysName?: string
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
    // whether to show the block's legend
    showLegend?: boolean
    // whether to try and translate
    translateData?: boolean
    // GraphQL query variables (handled by GraphQL)
    queryVariables?: string
    // block variables (compiled during sitemap generation)
    variables?: BlockVariables
    enableExport?: boolean
    awards?: Array<Award>
    // sub path generated by graphql
    path?: string
    i18nName?: string
    colorVariant?: string

    pageVariables?: PageVariables
    // Unique identifier for the block's page
    pageId?: string
}

interface BlockTemplate extends BlockProps {
    
}
  
type Overrides = {
    BlockTitle: string
}

type Award = {
    id: string
    value?: number | string
    name: string
    entity?: Entity
}

type BlockVariables = {
    pageId: string
    subject?: string
    heatMapId?: string
    sectionId?: string
    toolIds?: Array<string>

}



// type BlockTemplate = 


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