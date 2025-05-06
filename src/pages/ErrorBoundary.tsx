
import React, { Component, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<React.PropsWithChildren<{}>, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error en el componente:', error);
    console.error('Información del error:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-500 text-white">
          <h2>Ha ocurrido un error. Por favor, intente nuevamente más tarde.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
