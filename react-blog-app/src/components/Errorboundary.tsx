import React, { Component, type  ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo
        });

        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="max-w-xl mx-auto mt-12 p-6 bg-red-100 border border-red-400 text-red-800 rounded shadow">
                    <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
                    <p className="mb-4">An unexpected error occurred while rendering this part of the app.</p>
                    {process.env.NODE_ENV === "development" && this.state.error && (
                        <div className="text-sm whitespace-pre-wrap">
                            <strong>Error:</strong> {this.state.error.toString()}
                            <br />
                            <strong>Stack Trace:</strong>
                            <pre className="mt-2 bg-white p-2 text-xs text-black overflow-auto rounded">
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
