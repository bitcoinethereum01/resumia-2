
export const redirectLogin = (locale?: string, defaultLocale = "en", search = "") => {

  return {
    redirect: {
      destination: locale === defaultLocale ? `/login${search}` : `/${locale}/login${search}`,
      permanent: false,
    }
  }
}