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
  // const whatTheHealthLink = screen.getByRole('link', {
  //   name: 'What the Health',
  // });
  // const thisIsVeganPropagandaLink = screen.getByRole('link', {
  //   name: 'This is Vegan Propaganda',
  // });
  // const forksOverKnivesLink = screen.getByRole('link', {
  //   name: 'Forks Over Knives',
  // });
  expect(aboutHeading).toBeVisible();
  expect(aboutParagraph).toBeVisible();
  expect(cowspiracyLink).toBeVisible();
  //expect(whatTheHealthLink).toBeVisible();
  //expect(thisIsVeganPropagandaLink).toBeVisible();
  //expect(forksOverKnivesLink).toBeVisible();
});

test('renders contact page', () => {
  renderPage(<ContactPage />);
  const contactHeading: HTMLElement = screen.getByRole('heading', {
    name: contactDescription.heading,
  });
  //const contactForm: HTMLElement = screen.getByRole('form');
  const contactNameInput: HTMLElement = screen.getByRole('input', {
    name: 'name',
  });
  // const contactEmailInput: HTMLElement = screen.getByLabelText(
  //   'email',
  // );
  // const contactMessageInput: HTMLElement = screen.getByLabelText(
  //   'message',
  // );
  // const contactSubmitButton: HTMLElement = screen.getByRole('button', {
  //   name: contactDescription.button,
  // });
  expect(contactHeading).toBeVisible();
  //expect(contactForm).toBeVisible();
  expect(contactNameInput).toBeVisible();
  // expect(contactEmailInput).toBeVisible();
  // expect(contactMessageInput).toBeVisible();
  // expect(contactSubmitButton).toBeVisible();
  // expect(contactSubmitButton).toBeEnabled();
  // expect(contactSubmitButton).not.toBeDisabled();
  // expect(contactSubmitButton).not.toBeRequired();
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
