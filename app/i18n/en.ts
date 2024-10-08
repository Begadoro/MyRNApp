const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    somethingWrong: "Something went wrong",
    error: "Error",
    loggedOut: "User logged out",
  },
  loginScreen: {
    missingFields: "Email or password not correctly filled",
  },
  homeScreen: {
    explore: "Explore",
    categories: "Categories",
    popular: "Popular",
    search: "Search",
    noFounds: "Nothing found",
    more: "Load More",
    itemDesc: "This is particular kind of ",
  },
  productScreen: {
    addedFav: "Added to favorites",
    buy: "Buy: ",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
