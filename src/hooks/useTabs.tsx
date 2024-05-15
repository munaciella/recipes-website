import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Tabs = {
  home: boolean;
  about: boolean;
  recipes: boolean;
  contact: boolean;
};

export const useTabs = (): Tabs => {
  const [tabs, setTabs] = useState<Tabs>({
    home: true,
    about: false,
    recipes: false,
    contact: false,
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
        });
        break;
      case "/about":
        setTabs({
          home: false,
          about: true,
          recipes: false,
          contact: false,
        });
        break;
      case "/recipes":
        setTabs({
          home: false,
          about: false,
          recipes: true,
          contact: false,
        });
        break;
      case "/contact":
        setTabs({
          home: false,
          about: false,
          recipes: false,
          contact: true,
        });
        break;
      default:
        setTabs({
          home: false,
          about: false,
          recipes: false,
          contact: false,
        });
        break;
    }
  }, [pathname]);
  return tabs;
};
