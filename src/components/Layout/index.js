import React from 'react';

import './styles.scss';

export const Layout = ({ header, footer, children }) => (
  <div className="main-layout">
    {header &&
      <div className="main-layout__header">{header}</div>
    }
    {children &&
      <div className="main-layout__content">{children}</div>
    }
    {footer &&
      <div className="main-layout__footer">{footer}</div>
    }
  </div>
);

export default Layout;
