import React from "react"
import Link from "../localeLink"

export interface PageLinkProps {
  page: {
    id: string
    path: string
  }
  type: "previous" | "next"
  children?: React.ReactNode
  className?: string
  activeClassName?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const PageLink = ({
  page,
  children,
  className,
  activeClassName,
  onClick,
}: PageLinkProps) => (
  <Link
    to={page.path}
    className={className}
    activeClassName={activeClassName}
    onClick={onClick}
  >
    <span>{children}</span>
  </Link>
)

export default PageLink
