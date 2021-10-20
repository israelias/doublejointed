import React from "react"
import styled from "styled-components"
import { mq, spacing, fontSize } from "../../theme"
import PageLabel from "./pageLabel"
import PageLink, { PageLinkProps } from "./pageLink"

const StyledLink = styled(PageLink)`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: ${props =>
    props.type === "previous" ? "flex-start" : "flex-end"};
  padding: ${spacing()};

  @media ${mq.smallMedium} {
    font-size: ${fontSize("smaller")};
    span {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      text-align: center;
    }
  }
  @media ${mq.large} {
    font-size: ${fontSize("medium")};
  }

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`

interface PaginationLinkProps extends PageLinkProps {
  page: {
    id: string
    path: string
  }
  type: "previous" | "next"
}

const PaginationLink = ({ page, type }: PaginationLinkProps) => (
  <StyledLink
    page={page}
    className={`pagination__link pagination__${type}`}
    type={type}
  >
    {type === "previous" && (
      <span>
        «&nbsp;
        <PageLabel page={page} />
      </span>
    )}
    {type === "next" && (
      <span>
        <PageLabel page={page} />
        &nbsp;»
      </span>
    )}
  </StyledLink>
)

export default PaginationLink
