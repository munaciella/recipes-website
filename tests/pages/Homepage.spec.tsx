import { screen, fireEvent } from "@testing-library/react";
import { Homepage } from "@/app";
import { renderPage } from "../utils";
import { copy } from "@/copy";
import { useScreenMatcher } from "@/hooks";

const { description } = copy.home;
//const { nav, footer } = copy.common;

jest.mock("../../src/hooks/useScreenMatcher");
const mockUseScreenMatcher = jest.mocked(useScreenMatcher);
mockUseScreenMatcher.mockReturnValue({ screenMatches: true });

test("renders headings", () => {
  renderPage(<Homepage />);
  const veloVegansHeading: HTMLElement = screen.getByRole("heading", {
    name: `${description.heading.top} ${description.heading.bottom}`,
  });
  expect(veloVegansHeading).toBeVisible();
});

test("renders paragraphs", () => {
  renderPage(<Homepage />);
  const veloVegansParagraph: HTMLElement = screen.getByText(
    description.paragraph,
  );
  expect(veloVegansParagraph).toBeVisible();
});

test("renders image", () => {
  renderPage(<Homepage />);
  const image: HTMLElement = screen.getByRole("img", {
    name: description.img.alt,
  });
  expect(image).toHaveAttribute("alt", description.img.alt);
  expect(image).toBeVisible();
});