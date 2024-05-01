import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Tabs = {
  home: boolean;
  about: boolean;
  recipes: boolean;
};

export const useTabs = (): Tabs => {
  const [tabs, setTabs] = useState<Tabs>({
    home: true,
    about: false,
    recipes: false,
  });
  const pathname = usePathname();

  useEffect((): void => {
    switch (pathname) {
      case "/":
        setTabs({
          home: true,
          about: false,
          recipes: false,
        });
        break;
      case "/about":
        setTabs({
          home: false,
          about: true,
          recipes: false,
        });
        break;
      case "/recipes":
        setTabs({
          home: false,
          about: false,
          recipes: true,
        });
        break;
      default:
        setTabs({
          home: false,
          about: false,
          recipes: false,
        });
        break;
    }
  }, [pathname]);
  return tabs;
};
