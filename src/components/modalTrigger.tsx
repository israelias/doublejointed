import React from "react"
import { useTheme } from "styled-components"
import styled from "styled-components"
import { mq, spacing, color } from "../theme"
import Button from "./button"
import Modal from "react-modal"

const ModalClose = ({
  closeModal,
}: {
  closeModal: (e: React.MouseEvent | React.KeyboardEvent) => void
}) => <Close onClick={closeModal}>x</Close>

const Close = styled.div`
  display: block;
  font-size: 1.2rem;
  position: absolute;
  cursor: pointer;
  @media ${mq.small} {
    top: -3px;
    right: 6px;
  }
  @media ${mq.mediumLarge} {
    top: 0px;
    right: 10px;
  }
`
interface ModalTriggerProps {
  label?: string
  trigger?: React.ReactElement<any>
  children?: React.ReactNode
}

const ModalTrigger = ({ label, trigger, children }: ModalTriggerProps) => {
  const theme = useTheme()
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false)

  const openModal = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const closeModal = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    setIsOpen(false)
  }

  const triggerComponent = trigger ? (
    React.cloneElement(trigger as React.ReactElement<any>, {
      onClick: openModal,
    })
  ) : (
    <TriggerDefaultComponent
      className="PopoverToggle"
      onClick={openModal}
      // {...props}
    >
      {label}
    </TriggerDefaultComponent>
  )

  const childrenComponent = React.cloneElement(
    children as React.ReactElement<any>,
    {
      closeComponent: <ModalClose closeModal={closeModal} />,
    }
  )

  const customStyles = {
    overlay: {
      backgroundColor: `${theme.colors.background}99`,
      backdropFilter: "blur(5px)",
    },
    content: {
      // borderWidth: 0,
      // top: '50%',
      // left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      // padding: 0,
      // width: 'calc(100% - 40px)',
      // maxWidth: 950,
      // maxHeight: 'calc(100vh - 40px)',
      // overscrollBehavior: 'contain',
      // borderRadius: '10px',
      // background: theme.colors.backgroundAlt,
      // boxShadow: `0px 8px 16px rgba(0,0,0,0.75)`,
      // animation: css`
      //     ${pop} 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms 1 forwards
      // `,
    },
  }

  return (
    <>
      {triggerComponent}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={label}
        className="ModalContent"
        // overlayClassName="ModalOverlay"
      >
        <Content>
          <ModalClose closeModal={closeModal} />
          {children}
        </Content>
      </Modal>
    </>
  )
}

const Content = styled.div`
  position: absolute;
  right: auto;
  bottom: auto;

  border-width: 0;
  /* padding: 0; */
  overscroll-behavior: contain;
  border-radius: 10px;
  background: ${color("backgroundAlt2")};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.75);

  @media ${mq.small} {
    padding: ${spacing()};
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    top: ${spacing(1.5)};
    left: ${spacing(1.5)};
  }
  @media ${mq.mediumLarge} {
    padding: ${spacing(2)};
    width: calc(100% - 40px);
    max-width: 950px;
    max-height: calc(100vh - 40px);

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const TriggerDefaultComponent = styled(Button)``

export default ModalTrigger
