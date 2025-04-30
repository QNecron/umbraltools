import * as React from 'react';

declare module 'react' {
  
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    button?: string;
    card?: string;
    dialog?: string;
    heading?: string;
    hero?: string;
    input?: string;
    section?: string;
    wrapper?: string;
    // grid
    gap?: number;
    desktop?: number;
    tablet?: number;
    mobile?: number;
  }
  
}