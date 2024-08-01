import { screen, fireEvent } from '@testing-library/react';
import { Homepage } from '@/app';
import { renderPage } from '../utils';
import { copy } from '@/copy';
import { useScreenMatcher } from '@/hooks';
import AboutPage from '@/app/about/page';
import ContactPage from '@/app/contact/page';
import RecipesPage from '@/app/recipes/page';

const { description } = copy.home;
const { nav } = copy.common;
const { details } = copy.about;
const { contactDescription } = copy.contact;
const { recipesDescription } = copy.recipesPage;
const { recipes } = copy.recipesPage.recipesDescription;

jest.mock('../../src/hooks/useScreenMatcher');
const mockUseScreenMatcher = jest.mocked(useScreenMatcher);
mockUseScreenMatcher.mockReturnValue({ screenMatches: true });

test('renders headings', () => {
  renderPage(<Homepage />);
  const veloVegansHeading: HTMLElement = screen.getByRole('heading', {
    name: `${description.heading.top} ${description.heading.bottom}`,
  });
  expect(veloVegansHeading).toBeVisible();
});

test('renders paragraphs', () => {
  renderPage(<Homepage />);
  const veloVegansParagraph: HTMLElement = screen.getByText(
    description.paragraph
  );
  expect(veloVegansParagraph).toBeVisible();
});

test('renders image', () => {
  renderPage(<Homepage />);
  const image: HTMLElement = screen.getByRole('img', {
    name: description.img.alt,
  });
  expect(image).toHaveAttribute('alt', description.img.alt);
  expect(image).toBeVisible();
});

test('renders desktop navbar', () => {
  renderPage(<Homepage />);
  const navbar: HTMLElement = screen.getByRole('navigation');
  const about: HTMLElement = screen.getByRole('link', {
    name: /About/i,
  });
  const recipes: HTMLElement = screen.getByRole('link', {
    name: /Recipes/i,
  });
  const contact: HTMLElement = screen.getByRole('link', {
    name: /Contact/i,
  });
  const logo: HTMLElement = screen.getByRole('img', {
    name: nav.logo.alt,
  });

  expect(navbar).toBeVisible();
  expect(about).toBeVisible();
  expect(recipes).toBeVisible();
  expect(contact).toBeVisible();
  expect(logo).toHaveAttribute('alt', nav.logo.alt);
  expect(logo).toBeVisible();
});

test('renders mobile navbar', () => {
  mockUseScreenMatcher.mockReturnValue({ screenMatches: false });
  renderPage(<Homepage />);
  const mobileNavbar: HTMLElement = screen.getByRole('navigation');
  const burgerButton: HTMLElement = screen.getByRole('button', {
    name: /Burger Button/i,
  });
  expect(burgerButton).toBeVisible();
  fireEvent.click(burgerButton);
  const about: HTMLElement = screen.getByRole('link', {
    name: /About/i,
  });
  const recipes: HTMLElement = screen.getByRole('link', {
    name: /Recipes/i,
  });
  const contact: HTMLElement = screen.getByRole('link', {
    name: /Contact/i,
  });
  const home: HTMLElement = screen.getByRole('link', {
    name: /Home/i,
  });
  const logo: HTMLElement = screen.getByRole('img', {
    name: nav.logo.alt,
  });
  expect(home).toBeVisible();
  expect(mobileNavbar).toBeVisible();
  expect(about).toBeVisible();
  expect(recipes).toBeVisible();
  expect(contact).toBeVisible();
  expect(logo).toHaveAttribute('alt', nav.logo.alt);
  expect(logo).toBeVisible();
});

test('renders footer', () => {
  renderPage(<Homepage />);
  const footerElement: HTMLElement = screen.getByRole('contentinfo');
  const copyrightElement: HTMLElement = screen.getByRole('heading', {
    name: '© 2024 VeloVegans. All rights reserved.',
  });

  const socialInstagram = screen.getByRole('link', {
    name: 'Instagram',
  });
  const socialThreads = screen.getByRole('link', {
    name: 'Threads',
  });

  const socialX = screen.getByRole('link', {
    name: 'X',
  });

  expect(footerElement).toBeVisible();
  expect(copyrightElement).toBeVisible();
  expect(socialInstagram).toBeVisible();
  expect(socialThreads).toBeVisible();
  expect(socialX).toBeVisible();
});

test('renders about page', () => {
  renderPage(<AboutPage />);
  const aboutHeading: HTMLElement = screen.getByRole('heading', {
    name: details.heading,
  });
  const aboutParagraph: HTMLElement = screen.getByText(details.paragraph);
  const cowspiracyLink = screen.getByRole('link', {
    name: 'Cowspiracy',
  });
  expect(aboutHeading).toBeVisible();
  expect(aboutParagraph).toBeVisible();
  expect(cowspiracyLink).toBeVisible();
});

test('renders contact page', () => {
  renderPage(<ContactPage />);
  const contactHeading: HTMLElement = screen.getByRole('heading', {
    name: contactDescription.heading,
  });
  const contactNameInput: HTMLElement = screen.getByRole('input', {
    name: 'name',
  });
  
  expect(contactHeading).toBeVisible();
  expect(contactNameInput).toBeVisible();
});

test('renders recipes page', () => {
  renderPage(<RecipesPage />);
  const recipesHeading: HTMLElement = screen.getByRole('heading', {
    name: recipesDescription.heading.top,
  });
  const recipesParagraph: HTMLElement = screen.getByText(
    recipesDescription.heading.bottom
  );
  expect(recipesHeading).toBeVisible();
  expect(recipesParagraph).toBeVisible();
});

// test('renders recipe page', () => {
//   renderPage(<RecipesPage />);
//   const recipeHeading: HTMLElement = screen.getByRole('heading', {
//     name: recipeDescription.heading,
//   });
//   const recipeImage: HTMLElement = screen.getByRole('img');
//   const recipeIngredients: HTMLElement = screen.getByRole('list');
//   const recipeInstructions: HTMLElement = screen.getByRole('list');
//   expect(recipeHeading).toBeVisible();
//   expect(recipeImage).toBeVisible();
//   expect(recipeIngredients).toBeVisible();
//   expect(recipeInstructions).toBeVisible();
// });