import { Component, ErrorInfo, ReactNode } from 'react';
import error from '../../assets/error.gif';
import Image from 'next/image';

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
      return (
        <Image
          src={error}
          alt="error"
          className="error"
          width={600}
          height={500}
        />
      );
    }

    return this.props.children;
  }
}
