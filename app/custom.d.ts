import * as React from 'react';

declare module 'react' {
  
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    button?: string;
    dialog?: string;
    heading?: string;
    hero?: string;
    wrapper?: string;
  }
  
}