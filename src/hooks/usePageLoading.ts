import Router from "next/router";
import { useEffect, useState } from "react";

export const usePageLoading = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  useEffect(() => {
    const start = (url: string) => {
      setLoading(true);
      setUrl(url);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return { loading, url }
}