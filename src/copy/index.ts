export const copy = {
    common: {
      nav: {
        logo: {
          alt: "velovegans logo",
          src: "/assets/logo_size-removebg-preview.png",
        },
        home: "Home",
        about: "About",
        recipes: "Recipes",
        contact: "Contact",
      },
      footer: {
        companyName: "VeloVegans.",
        msg: "All rights reserved.",
        socials: [
            { href: "https://www.instagram.com", name: "Instagram" },
          { href: "https://www.threads.com", name: "Threads" },
          { href: "https://www.x.com", name: "X" },
        ],
      },
    },
    home: {
      description: {
        heading: {
          top: "VeloVegans",
          bottom: "Cruelty Free Recipes",
        },
        paragraph:
          "Saving the animals and our planet one meal at a time.",
        img: {
          alt: "velovegans logo",
          src: "/assets/original-logo.jpg",
        },
      },
    
    },
  } as const;
  