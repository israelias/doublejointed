import React, { PureComponent } from "react"
import propTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import "../styles/screen.scss"
import Head from "../components/head"
import { PageContextProvider } from "../context/page.context"
import { KeydownContextProvider } from "../context/keydown.context"
import { mergePageContext } from "../helpers/page.helpers"
// import { I18nContextProvider } from "core/i18n/i18nContext"
import { EntitiesContextProvider } from "../context/entities.context"
// import PageMetaDebug from './pages/PageMetaDebug'
import { GlobalStyle } from "../theme"
import MainLayout from "./main.layout"

import theme from "../theme/defaultTheme/index"

const ThemedLayout = props => {
  return (
    <ThemeProvider theme={theme}>
      <EntitiesContextProvider>
        <GlobalStyle />
        <Head />
        <MainLayout {...props} />
      </EntitiesContextProvider>
    </ThemeProvider>
  )
}

export default class Layout extends PureComponent {
  static propTypes = {
    showPagination: propTypes.bool.isRequired,
  }

  static defaultProps = {
    showPagination: true,
  }

  constructor() {
    super()
    this.state = {
      showSidebar: false,
    }
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  toggleSidebar = () => {
    this.setState({
      showSidebar: !this.state.showSidebar,
    })
  }

  closeSidebar = () => {
    this.setState({
      showSidebar: false,
    })
  }

  render() {
    const { showPagination, location, pageContext } = this.props
    const { showSidebar } = this.state
    const context = mergePageContext(pageContext, location, this.state)
    return (
      <KeydownContextProvider>
        <PageContextProvider value={context}>
          <>
            <ThemedLayout
              context={context}
              showPagination={showPagination}
              showSidebar={showSidebar}
              toggleSidebar={this.toggleSidebar}
              closeSidebar={this.closeSidebar}
              props={this.props}
            />
          </>
        </PageContextProvider>
      </KeydownContextProvider>
    )
  }
}
