// import { ReactNode } from "react";
// import { render } from "@testing-library/react";
// import RootLayout from "@/app/layout";

// type Overrides = {};

// export const renderPage = (children: ReactNode, overrides?: Overrides) =>
//   render(<RootLayout>{children}</RootLayout>);

import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import RootLayout from "@/app/layout";

type Overrides = {};

export const renderPage = (
  children: ReactNode,
  overrides?: Overrides,
  options?: Omit<RenderOptions, "queries">,
) => {
  return render(<RootLayout>{children}</RootLayout>, options);
};
