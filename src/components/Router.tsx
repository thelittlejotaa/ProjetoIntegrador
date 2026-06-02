import React, { createContext, useContext, useState, useEffect } from "react";

const RouterContext = createContext<{
  path: string;
  navigate: (to: string) => void;
}>({
  path: "/dashboard",
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  // Support standard path or default to /dashboard
  const getInitialPath = () => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      return p === "/" || p === "" ? "/dashboard" : p;
    }
    return "/dashboard";
  };

  const [path, setPath] = useState(getInitialPath());

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(RouterContext);
  return { pathname: context.path };
}

export function Link({
  to,
  children,
  className,
  ...props
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const context = useContext(RouterContext);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    context.navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
