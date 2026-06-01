import i18next from 'i18next'
import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    return this.state.hasError ? (
      <>
        <h1>{i18next.t('erfassung.general_error')}</h1>
        <h4>{this.state.message}</h4>
      </>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary
