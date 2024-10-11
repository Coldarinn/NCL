import { Link, RouteObject } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <div>
        MAIN PAGE
        <Link to="/about">GO TO ABOUT</Link>
      </div>
    ),
  },
  {
    path: "/about",
    lazy: async () => {
      const { About } = await import("./About");
      return { Component: About };
    },
  },
  {
    path: "/catalog",
    element: (
      <div>
        CATALOG PAGE <Link to="/catalog/8967127">GO TO ITEM</Link>
      </div>
    ),
    children: [
      {
        path: "/catalog/:catalogId",
        element: <div>CATALOG ITEM PAGE</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
];
