'use client';
import React from 'react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  render() {
    if (this.state.err) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-8 text-center">
          <b className="text-[20px]">Something went wrong</b>
          <p className="text-[14px] text-muted">Try refreshing. If you were demoing, reset sample data from Profile.</p>
          <Button variant="primary" onClick={() => { this.setState({ err: null }); window.location.reload(); }}>Reload</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
