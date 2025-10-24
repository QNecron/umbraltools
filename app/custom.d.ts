import 'react';

declare module 'react' {

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    accordion?: string;
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

declare module 'react' {

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }

}
