import React, { memo } from "react"

const FeatureResources = ({
  id,
  mdnInfo,
  caniuseInfo,
}: {
  id: string
  mdnInfo: any
  caniuseInfo: any
}) => {
  if (!caniuseInfo && !mdnInfo) {
    return null
  }

  return (
    <div className="Feature__Resources FTBlock__Resources">
      <h3>Learn More (MDN)</h3>
      <ul>
        {mdnInfo && (
          <li className="Feature__Links__Item">
            <a href={`https://developer.mozilla.org${mdnInfo.url}`}>MDN</a>
          </li>
        )}

        {caniuseInfo && (
          <>
            {caniuseInfo.spec && (
              <li className="Feature__Links__Item">
                <a href={caniuseInfo.spec}>W3C Specification</a>
              </li>
            )}
            <li className="Feature__Links__Item">
              <a href={`https://caniuse.com/#feat=${id}`}>CanIUse</a>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default memo(FeatureResources)
