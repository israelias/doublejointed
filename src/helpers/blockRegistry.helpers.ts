// generic charts
import HorizontalBarBlock from '../components/blocks/generic/HorizontalBarBlock'
import VerticalBarBlock from '../components/blocks/generic/VerticalBarBlock'
import HeatmapBlock from '../components/blocks/generic/HeatmapBlock'

// other
import TextBlock from '../components/blocks/other/TextBlock'
import RecommendedResourcesBlock from '../components/blocks/other/RecommendedResourcesBlock'
import PageIntroductionBlock from '../components/blocks/other/PageIntroductionBlock'
import SurveyIntroBlock from '../components/blocks/other/SurveyIntroBlock'
import NewsletterBlock from '../components/blocks/other/NewsletterBlock'
import SponsorsBlock from '../components/blocks/other/SponsorsBlock'
import PicksBlock from '../components/blocks/other/PicksBlock'
import TranslatorsBlock from '../components/blocks/other/TranslatorsBlock'
import TshirtBlock from '../components/blocks/other/TshirtBlock'
import AwardBlock from '../components/blocks/awards/AwardBlock'
import ConclusionBlock from '../components/blocks/other/ConclusionBlock'
import NotFoundBlock from '../components/blocks/other/NotFoundBlock'
// import ReportBlock from 'core/report/ReportBlock'
import HintBlock from '../components/blocks/other/HintBlock'

// demographics
import ParticipationByCountryBlock from '../components/blocks/demographics/ParticipationByCountryBlock'
import GenderBlock from '../components/blocks/demographics/GenderBlock'

// features
import FeatureExperienceBlock from '../components/blocks/features/FeatureExperienceBlock'
import FeaturesOverviewBlock from '../components/blocks/features/FeaturesOverviewBlock'
import KnowledgeScoreBlock from '../components/blocks/features/KnowledgeScoreBlock'

// tools
import ToolHeaderBlock from '../components/blocks/tools/ToolHeaderBlock'
import ToolExperienceBlock from '../components/blocks/tools/ToolExperienceBlock'
import ToolsSectionStreamsBlock from '../components/blocks/tools/ToolsSectionStreamsBlock'
import { ToolsExperienceRankingBlock } from '../components/blocks/tools/ToolsExperienceRankingBlock'
import ToolsScatterplotBlock from '../components/blocks/tools/ToolsScatterplotBlock'
import { ToolsArrowsBlock } from '../components/blocks/tools/ToolsArrowsBlock'
import { ToolsExperienceMarimekkoBlock } from '../components/blocks/tools/ToolsExperienceMarimekkoBlock'
import { SectionToolsCardinalityByUserBlock } from '../components/blocks/tools/SectionToolsCardinalityByUserBlock'
import { AllSectionsToolsCardinalityByUserBlock } from '../components/blocks/tools/AllSectionsToolsCardinalityByUserBlock'
import { ToolsCityscapeBlock } from '../components/blocks/tools/ToolsCityscapeBlock'
// import ToolExperienceGraphBlock from 'core/blocks/tools/ToolExperienceGraphBlock'
// import ToolsSectionOverviewBlock from 'core/blocks/tools/ToolsSectionOverviewBlock'
// import ToolsMatricesBlock from 'core/blocks/tools/ToolsMatricesBlock'
// import { ToolsUsageVariationsBlock } from 'core/blocks/tools/ToolsUsageVariationsBlock'

// happiness
import { HappinessHistoryBlock } from '../components/blocks/happiness/HappinessHistoryBlock'

// opinions
import OpinionBlock from '../components/blocks/opinions/OpinionBlock'

/**
 * Please make sure to comment out unused blocks,
 * this is gonna help regarding bundle size.
 */
const blockRegistry = {
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

export default blockRegistry

// export type BlockType = {
//     [P in keyof typeof blockRegistry]: any
// };
