import { useState, useEffect } from "react";

export const useScreenMatcher = (query: string) => {
  const [screenMatches, setScreenMatches] = useState<boolean>(true);

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(query);
    if (media.matches !== screenMatches) {
      setScreenMatches(media.matches);
    }
    const resizeListener = () => setScreenMatches(media.matches);
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [screenMatches, query]);

  return { screenMatches };
};
