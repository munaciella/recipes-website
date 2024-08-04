import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Tabs = {
  home: boolean;
  about: boolean;
  recipes: boolean;
  contact: boolean;
  signup: boolean;
  login: boolean;
};

export const useTabs = (): Tabs => {
  const [tabs, setTabs] = useState<Tabs>({
    home: true,
    about: false,
    recipes: false,
    contact: false,
    signup: false,
    login: false,
  });
  const pathname = usePathname();

  useEffect((): void => {
    switch (pathname) {
      case "/":
        setTabs({
          home: true,
          about: false,
          recipes: false,
          contact: false,
          signup: false,
          login: false,
        });
        break;
      case "/about":
        setTabs({
          home: false,
          about: true,
          recipes: false,
          contact: false,
          signup: false,
          login: false,
        });
        break;
      case "/recipes":
        setTabs({
          home: false,
          about: false,
          recipes: true,
          contact: false,
          signup: false,
          login: false,
        });
        break;
      case "/contact":
        setTabs({
          home: false,
          about: false,
          recipes: false,
          contact: true,
          signup: false,
          login: false,
        });
        break;
        case "/signup":
          setTabs({
            home: false,
            about: false,
            recipes: false,
            contact: false,
            signup: true,
            login: false,
          });
          break;
          case "/login":
            setTabs({
              home: false,
              about: false,
              recipes: false,
              contact: false,
              signup: false,
              login: true,
            });
      default:
        setTabs({
          home: false,
          about: false,
          recipes: false,
          contact: false,
          signup: false,
          login: false,
        });
        break;
    }
  }, [pathname]);
  return tabs;
};
