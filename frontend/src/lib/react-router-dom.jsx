import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext({
  path: '/',
  navigate: () => {}
});

const normalizePath = (path) => {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

export function BrowserRouter({ children }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to) => {
    const nextPath = normalizePath(to);
    if (nextPath !== path) {
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
    }
  };

  const value = useMemo(() => ({ path, navigate }), [path]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function Link({ to, children, onClick, ...props }) {
  const { navigate } = useContext(RouterContext);

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
      return;
    }

    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function Routes({ children }) {
  const { path } = useContext(RouterContext);
  const items = React.Children.toArray(children);
  const activeRoute = items.find((child) => React.isValidElement(child) && normalizePath(child.props.path) === path);
  return activeRoute ?? null;
}

export function Route({ element }) {
  return element;
}
