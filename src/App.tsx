import React from 'react'
import { ContextProvider } from './components/ContextProvider'
import { Form } from './components/Form'
import { Header } from './components/Header'
import { UrlList } from './components/UrlList'
import { Wrapper } from './components/Wrapper'

/**
 * The main application component.
 *
 * This component renders the main layout of the application, including
 * the form for entering links and the list of saved links.
 */

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Wrapper>
        <Header />
        <Form />
      </Wrapper>
    </ContextProvider>
  )
}

export default App
