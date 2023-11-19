import { Component, ErrorInfo, ReactNode } from 'react';
import error from '../../assets/img/error.gif';

export default class ErrorBoundary extends Component<{
  children: ReactNode;
}> {
  state = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);

    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <img src={error} alt="error" className="error" />;
    }

    return this.props.children;
  }
}
