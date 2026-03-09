import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log to error reporting service in production
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#E6E6E1] flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="bg-white border-4 border-black rounded-xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Icon */}
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-8">
                <AlertTriangle size={32} className="text-[#E6E6E1]" />
              </div>

              {/* Content */}
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
                Something broke.
              </h1>
              <p className="text-lg text-black/70 font-medium mb-8">
                An unexpected error occurred. This has been logged and we'll look into it.
              </p>

              {/* Error details (dev only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-black/5 border-2 border-black/20 rounded-lg p-4 mb-8 font-mono text-sm overflow-auto max-h-40">
                  <div className="text-black/50 uppercase text-xs tracking-wider mb-2">Error</div>
                  <div className="text-black/80">{this.state.error.toString()}</div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={this.handleRetry}
                  className="flex items-center justify-center gap-2 bg-black text-[#E6E6E1] px-6 py-4 font-bold uppercase tracking-tight hover:bg-black/90 transition-colors rounded-lg"
                >
                  <RefreshCw size={18} />
                  Try again
                </button>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 bg-white text-black px-6 py-4 font-bold uppercase tracking-tight border-2 border-black hover:bg-black/5 transition-colors rounded-lg"
                >
                  <Home size={18} />
                  Go home
                </Link>
              </div>
            </div>

            {/* Footer note */}
            <p className="text-center text-black/50 font-mono text-xs uppercase tracking-wider mt-8">
              Error reference: {Date.now().toString(36).toUpperCase()}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
