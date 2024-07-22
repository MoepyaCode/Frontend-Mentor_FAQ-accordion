import { Assets } from '../../assets'
import { Container, Main, Wrapper } from '../../components'
import React from 'react'

type ResolutionType = 'desktop' | 'mobile'
const screenResolutions: Record<string, ResolutionType> = {
  desktop: 'desktop',
  mobile: 'mobile',
}

interface FAQInterface {
  question: string,
  answer: string,
  isToggleOpen: boolean,
}

const FAQData: FAQInterface[] = [
  {
    question: 'What is Frontend Mentor, and how will it help me?',
    answer: 'Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It’s suitable for all levels and ideal for portfolio building.',
    isToggleOpen: false,
  },
  {
    question: 'Is Frontend Mentor free?',
    answer: 'Yes, Frontend Mentor offers both free and paid plans for users to practice and improve their frontend development skills.',
    isToggleOpen: false,
  },
  {
    question: 'Can I use Frontend Mentor projects in my portfolio?',
    answer: 'Yes, you can use Frontend Mentor projects in your portfolio to showcase your skills and completed work.',
    isToggleOpen: false,
  },
  {
    question: 'How can I get help if I\'m stuck on a challenge?',
    answer: "If you're stuck on a challenge, you can get help by visiting the Frontend Mentor community forum, asking questions on their Slack channel, or referring to the provided resources and solution files.",
    isToggleOpen: false,
  }
]

export default function FAQ() {
  const startingView = (window.innerWidth <= 460) ? screenResolutions.mobile : screenResolutions.desktop
  const [screenType, setScreenType] = React.useState<ResolutionType>(startingView)
  const [faqs, setFaqs] = React.useState<FAQInterface[]>(FAQData)

  function backgroundOnResize() {
    if (screenType === screenResolutions.mobile) {
      return (
        <img
          className='absolute top-0 left-0 w-screen'
          src={Assets.backgroundPatternMobile}
          alt="background pattern mobile"
        />
      )
    }

    return (
      <img
        className='absolute top-0 left-0 w-screen'
        src={Assets.backgroundPatternDesktop}
        alt="background pattern desktop"
      />
    )
  }

  function content() {
    const onClickToggle = (index: number) => {
      console.log('hello world')
      setFaqs(state => state.map((faq, i) => {
        if (i === index) {
          return {
            ...faq,
            isToggleOpen: !faq.isToggleOpen
          }
        }
        return faq
      }))
    }

    return (
      <ul className='w-full'>
        {faqs.map((faq, index) => (
          <li
            key={index}
            className='py-[24px] border-b border-pink-light last:border-b-0 flex flex-col flex-nowrap'
          >
            {/* Toggle Wrapper */}
            <Wrapper className='relatve flex flex-row flex-nowrap justify-between items-center gap-6 xs:gap:[24px] w-full'>
              <h2 className='font-worksans font-semibold text-[16px]'>{faq.question}</h2>
              <button
                className='w-[24px] aspect-square'
                onClick={() => onClickToggle(index)}
              >
                <img
                  className='max-w-[unset]'
                  src={faq.isToggleOpen ? Assets.iconMinus : Assets.iconPlus} alt="Icon" />
              </button>
            </Wrapper>

            {/* Toggle Answer */}
            {faq.isToggleOpen && (
              <p className={`py-[24px] text-purple-grayish font-normal font-worksans`}>
                {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    )
  }

  React.useEffect(() => {
    function windowResizeHandler() {
      if (window.innerWidth <= 460) {
        setScreenType('mobile')
      } else {
        setScreenType('desktop')
      }
    }

    window.addEventListener('resize', windowResizeHandler)
    return () => window.removeEventListener('resize', windowResizeHandler)
  }, [screenType])

  return (
    <Main className='bg-pink-light relative grid place-items-center min-w-full'>
      {/* Background Image */}
      {backgroundOnResize()}

      {/* FAQ Container */}
      <Container
        className='z-[1] max-w-[600px] w-[85%] min-h-fit bg-white rounded-[8px] flex flex-col flex-nowrap justify-start items-center p-[24px] xs:p-[40px] gap-[24px] xs:gap-[32px]'
      >
        {/* FAQ Header */}
        <Wrapper
          className='flex flex-row flex-nowrap justify-start` items-center w-full gap-[24px]'
        >
          <img
            src={Assets.iconStar}
            alt="Icon Star"
          />
          <h1 className='font-worksans font-bold text-[32px] text-purple-dark'>FAQs</h1>
        </Wrapper>

        {/* FAQ Content */}
        {content()}

      </Container>
    </Main>
  )
}