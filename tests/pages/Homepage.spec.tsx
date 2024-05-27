import { screen, fireEvent } from "@testing-library/react";
import { Homepage } from "@/app";
import { renderPage } from "../utils";
import { copy } from "@/copy";
import { useScreenMatcher } from "@/hooks";

const { description } = copy.home;
const { nav, footer } = copy.common;

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

test("renders desktop navbar", () => {
  renderPage(<Homepage />);
  const navbar: HTMLElement = screen.getByRole("navigation");
  const about: HTMLElement = screen.getByRole("link", {
    name: /About/i,
  });
  const recipes: HTMLElement = screen.getByRole("link", {
    name: /Recipes/i,
  });
  const contact: HTMLElement = screen.getByRole("link", {
    name: /Contact/i,
  });
  const logo: HTMLElement = screen.getByRole("img", {
    name: nav.logo.alt,
  });

  expect(navbar).toBeVisible();
  expect(about).toBeVisible();
  expect(recipes).toBeVisible();
  expect(contact).toBeVisible();
  expect(logo).toHaveAttribute("alt", nav.logo.alt);
  expect(logo).toBeVisible();
});