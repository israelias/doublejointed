import React from "react"
import { Link, GatsbyLinkProps } from "gatsby"
import { usePageContext } from "../context/page.context"
import get from "lodash/get"

export interface LocaleState {
  location: any
}

export interface LocaleLinkProps extends GatsbyLinkProps<LocaleState> {
  activeClassName?: string
  activeStyle?: object
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  partiallyActive?: boolean
  replace?: boolean
  state?: LocaleState
  to: string
}

const LocaleLink = (props: LocaleLinkProps) => {
  const context = usePageContext()
  return (
    <Link
      activeClassName={props.activeClassName}
      activeStyle={props.activeStyle}
      onClick={props.onClick}
      partiallyActive={props.partiallyActive}
      replace={props.replace}
      state={props.state}
      //   {...props}
      to={`${get(context, "locale.path")}${props.to}`}
    />
  )
}

export default LocaleLink
