import React from "react"
import PageHeader from "./pageHeader"
import PageFooter from "./pageFooter"
import { usePageContext } from "../../context/page.context"
import BlockSwitcher from "../blocks/block/blockSwitcher"

export interface PageTemplateProps {
  isDebugEnabled: boolean
  pageData: {}
  showTitle: boolean
  is_hidden: boolean
}

// const PageTemplate = ({
//   pageData,
//   showTitle = true,
//   is_hidden = false,
// }: PageTemplateProps) => {
//   const context = usePageContext()
//   //   const { pageData, showTitle = true, is_hidden = false } = pageContext
//   return (
//     <>
//       {showTitle && <PageHeader />}
//       <div className="Page__Contents">
//         {context.blocks &&
//           context.blocks.map((block, i) => (
//             <BlockSwitcher
//               key={block.id}
//               block={block}
//               pageData={pageData}
//               index={i}
//             />
//           ))}
//       </div>
//       {!is_hidden && <PageFooter />}
//     </>
//   )

const PageTemplate = (props: PageTemplateProps) => {
  const context = usePageContext()
  //   const { pageData, showTitle = true, is_hidden = false } = props
  return (
    <>
      {props.showTitle && <PageHeader />}
      <div className="Page__Contents">
        {context.blocks &&
          context.blocks.map((block, i) => (
            <BlockSwitcher
              key={block.id}
              block={block}
              pageData={props.pageData}
              index={i}
            />
          ))}
      </div>
      {!is_hidden && <PageFooter />}
    </>
  )
}

export default PageTemplate
