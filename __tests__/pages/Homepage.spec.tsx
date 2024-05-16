import { screen, fireEvent } from "@testing-library/react";
import { Homepage } from "@/app";
import { renderPage } from "../utils";
import { copy } from "@/copy";
import { useScreenMatcher } from "@/hooks";

//const { description, search } = copy.home;
//const { nav, footer } = copy.common;

jest.mock("../../src/hooks/useScreenMatcher");
const mockUseScreenMatcher = jest.mocked(useScreenMatcher);
mockUseScreenMatcher.mockReturnValue({ screenMatches: true });

test("renders headings", () => {
  renderPage(<Homepage />);
  const thePlaceHeading: HTMLElement = screen.getByRole("heading", {
    name: `${description.heading.top} ${description.heading.bottom}`,
  });
  expect(thePlaceHeading).toBeVisible();
});