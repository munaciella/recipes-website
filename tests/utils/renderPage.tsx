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
