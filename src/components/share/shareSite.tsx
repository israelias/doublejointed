import React from "react"
import styled from "styled-components"
import ShareTwitter from "./shareTwitter"
import ShareEmail from "./shareEmail"
import ShareFacebook from "./shareFacebook"
import ShareLinkedIn from "./shareLinkedIn"
import config from "../../config/config.yml"

const { hashtag, year, siteTitle, siteUrl } = config

const ShareSite = () => {
  const options = { values: { hashtag, year, siteTitle, link: siteUrl } }
  const title = "Discover the StateOf JavaScript 2019 results"
  const twitterText = `Discover the State Of JavaScript 2019 results ${options.values.link} #StateOfJS`
  const subject = "State Of JavaScript Survey Results"
  const body = `Here are some interesting JavaScript survey results: ${options.values.link}`

  return (
    <Container className="ShareSite">
      <ShareTwitter text={twitterText} />
      <ShareFacebook link={siteUrl} />
      <ShareLinkedIn link={siteUrl} title={title} />
      <ShareEmail subject={subject} body={body} />
    </Container>
  )
}

const Container = styled.div`
  border-top: ${props => props.theme.separationBorder};
  display: flex;
  justify-content: space-evenly;
  position: relative;
  z-index: 1;
`

export default ShareSite
