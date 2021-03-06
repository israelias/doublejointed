import React, { memo, useState } from "react"
import styled from "styled-components"
import last from "lodash/last"
import { mq, spacing, color, screenReadersOnlyMixin } from "../../../theme"
import ShareBlock from "../../share/shareBlock"
import BlockExport from "./blockExport"
// import { useI18n } from "core/i18n/i18nContext"
import { usePageContext } from "../../../context/page.context"
import {
  getBlockMeta,
  getBlockTitleKey,
  getBlockDescriptionKey,
  getBlockTitle,
} from "../../../helpers/block.helpers"
import SharePermalink from "../../share/sharePermalink"
import BlockUnitsSelector from "./blockUnitsSelector"
import BlockCompletionIndicator from "./blockCompletionIndicator"
// import T from "core/i18n/T"
import Button from "../../button"
import Popover from "../../popover"

import { PageContextType } from "../../../context/page.context"

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    x="0"
    y="0"
    viewBox="0 0 24 24"
  >
    <g>
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      >
        <circle cx="3" cy="12" r="2.5"></circle>
        <circle cx="12" cy="12" r="2.5"></circle>
        <circle cx="21" cy="12" r="2.5"></circle>
      </g>
    </g>
    <path fill="none" d="M0 0H24V24H0z"></path>
  </svg>
)

const More = (props: { className: string }) => {
  return (
    <MoreButton {...props}>
      <ScreenReadersHint>{"More Actions"}</ScreenReadersHint>
      <MoreIcon />
    </MoreButton>
  )
}

const ScreenReadersHint = styled.span`
  ${screenReadersOnlyMixin}
`

const MoreButton = styled(Button)`
  @media ${mq.mediumLarge} {
    display: none;
  }
  padding: 0px 8px;
  svg {
    display: block;
    width: 18px;
  }
  g {
    stroke: ${color("text")};
  }
`

export interface BlockTitleContentsProps {
  block: BlockProps
  context: PageContextType
}

const BlockTitleContents = ({ block, context }: BlockTitleContentsProps) => {
  const { title, titleLink } = block
  if (title) {
    return titleLink ? <a href={titleLink}>{title}</a> : title
  } else {
    return getBlockTitleKey(block, context)
  }
}

const BlockDescriptionContents = ({
  block,
  context,
}: BlockTitleContentsProps) => {
  const { description, enableDescriptionMarkdown = true } = block
  const key = `${getBlockDescriptionKey(block, context)}`
  if (description) {
    return (
      <Description className="Block__Description">{description}</Description>
    )
  }
  return null
}

export interface BlockTitleProps {
  block: BlockProps
  showDescription: boolean
  isShareable: boolean
  isExportable?: boolean
  units?: "percentage" | "count"
  setUnits?: React.Dispatch<React.SetStateAction<"percentage" | "count">>
  switcher?: boolean
  closeComponent?: React.ReactComponent
  data?: any
  values?: any
}

const BlockTitle = ({
  isShareable,
  isExportable = true,
  values,
  units,
  setUnits,
  data,
  block,
  switcher,
  closeComponent,
}: BlockTitleProps) => {
  const { id, showDescription = true } = block
  const completion =
    data &&
    (Array.isArray(data)
      ? last(data) && last(data).completion
      : data.completion)
  const [showOptions, setShowOptions] = useState(false)
  const context = usePageContext()
  const translate = () => {}

  const blockTitle = getBlockTitle(block, context, translate)
  const blockMeta = getBlockMeta(block, context, translate)

  const properties = {
    context,
    block,
    isExportable,
    isShareable,
    values,
    id,
    data,
    blockTitle,
    setShowOptions,
    showOptions,
    switcher,
    units,
    setUnits,
  }

  return (
    <>
      <StyledBlockTitle className="Block__Title">
        <LeftPart>
          <BlockTitleText className="BlockTitleText">
            <SharePermalink url={blockMeta.link} />
            <BlockTitleContents block={block} context={context} />
            {completion && !context.isCapturing && (
              <BlockCompletionIndicator completion={completion} />
            )}
          </BlockTitleText>
          <Popover trigger={<More />}>
            <PopoverContents>
              <BlockTitleActions {...properties} />
              <BlockTitleSwitcher {...properties} />
            </PopoverContents>
          </Popover>
          <BlockTitleActionsWrapper>
            <BlockTitleActions {...properties} />
          </BlockTitleActionsWrapper>
        </LeftPart>
        <BlockTitleSwitcherWrapper>
          <BlockTitleSwitcher {...properties} />
          {closeComponent}
        </BlockTitleSwitcherWrapper>
      </StyledBlockTitle>
      {showDescription && (
        <BlockDescriptionContents block={block} context={context} />
      )}
    </>
  )
}

const BlockTitleActions = ({
  isExportable,
  isShareable,
  values,
  block,
  context,
  id,
  data,
  blockTitle,
  setShowOptions,
  showOptions,
}) => (
  <>
    {isExportable && block && !context.isCapturing && (
      <BlockExport
        id={id}
        data={data}
        block={block}
        title={blockTitle}
        className="Block__Title__Export"
      />
    )}
    {isShareable && !context.isCapturing && (
      <ShareBlock
        block={block}
        className="Block__Title__Share"
        values={values}
        title={blockTitle}
        toggleClass={() => {
          setShowOptions(!showOptions)
        }}
      />
    )}
  </>
)

const BlockTitleSwitcher = ({ switcher, units, setUnits }) => (
  <>
    {switcher ? (
      <BlockChartControls className="BlockChartControls">
        {switcher}
      </BlockChartControls>
    ) : (
      units &&
      setUnits && (
        <BlockChartControls className="BlockChartControls">
          <BlockUnitsSelector units={units} onChange={setUnits} />
        </BlockChartControls>
      )
    )}
  </>
)

const StyledBlockTitle = styled.div`
  border-bottom: ${props => props.theme.separationBorder};
  padding-bottom: ${spacing(0.5)};
  margin-bottom: ${spacing(1)};
  display: flex;
  align-items: center;

  /* .Block__Title__Share {
        margin-left: ${spacing(0.5)};
    } */

  &:hover {
    .SharePermalink {
      opacity: 1;
    }
  }
  position: relative;
  .PopoverInner {
    position: static;
  }
  .PopoverPopup {
    &:before {
      left: auto;
      right: 0;
    }
  }
`

const BlockTitleText = styled.h3`
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media ${mq.small} {
    opacity: 1;
    transition: all 300ms ease-in;
    flex: 1;
  }
`

const LeftPart = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Description = styled.div`
  margin-bottom: ${spacing(1)};

  p {
    &:last-child {
      margin: 0;
    }
  }
`

const BlockChartControls = styled.div`
  @media ${mq.small} {
  }
  @media ${mq.mediumLarge} {
    display: flex;
    justify-content: flex-end;
  }

  .capture & {
    display: none;
  }
`

const PopoverContents = styled.div`
  .ShareBlock,
  .BlockChartControls {
    margin-top: ${spacing()};
  }
`

const BlockTitleActionsWrapper = styled.div`
  @media ${mq.small} {
    display: none;
  }
  @media ${mq.mediumLarge} {
    display: flex;
    .ShareBlock {
      margin-left: ${spacing(0.5)};
    }
  }
`

const BlockTitleSwitcherWrapper = styled.div`
  @media ${mq.small} {
    display: none;
  }
`

export default memo(BlockTitle)
