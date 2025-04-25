import * as React from 'react';

declare module 'react' {
  
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    button?: string;
    card?: string;
    dialog?: string;
    heading?: string;
    hero?: string;
    section?: string;
    wrapper?: string;
    // grid
    desktop?: number;
    tablet?: number;
    mobile?: number;
  }
  
}