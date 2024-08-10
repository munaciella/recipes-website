import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Tabs = {
  home: boolean;
  about: boolean;
  recipes: boolean;
  contact: boolean;
  login: boolean;
  signup: boolean;
};

export const useTabs = (): Tabs => {
  const [tabs, setTabs] = useState<Tabs>({
    home: true,
    about: false,
    recipes: false,
    contact: false,
    login: false,
    signup: false,
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
          login: false,
          signup: false,
        });
        break;
      case "/about":
        setTabs({
          home: false,
          about: true,
          recipes: false,
          contact: false,
          login: false,
          signup: false,
        });
        break;
      case "/recipes":
        setTabs({
          home: false,
          about: false,
          recipes: true,
          contact: false,
          login: false,
          signup: false,
        });
        break;
      case "/contact":
        setTabs({
          home: false,
          about: false,
          recipes: false,
          contact: true,
          login: false,
          signup: false,
        });
        break;
        case "/login":
          setTabs({
            home: false,
            about: false,
            recipes: false,
            contact: false,
            login: true,
            signup: false,
          });
          break;
          case "/signup":
            setTabs({
              home: false,
              about: false,
              recipes: false,
              contact: false,
              login: false,
              signup: true,
            });
      default:
        setTabs({
          home: false,
          about: false,
          recipes: false,
          contact: false,
          login: false,
          signup: false,
        });
        break;
    }
  }, [pathname]);
  return tabs;
};
