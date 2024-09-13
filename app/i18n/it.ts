
const it = {
  common: {
    ok: "OK!",
    cancel: "Cancellare",
    back: "Indietro",
    somethingWrong: "Qualcosa è andato storto",
    error: "Errore",
    loggedOut: "Utente disconnesso",
  },
  loginScreen:{
    missingFields: "Email o password non correttamente compilati"
  },
  homeScreen:{
    explore: "Esplora",
    categories: "Categorie",
    popular: "Popolari",
    search: "Cerca",
    noFounds: "Nessun prodotto trovato",
    more: "Carica altro",
    itemDesc: "Questo è un particolarissimo tipo di "
  },
  productScreen:{
    addedFav: "Aggiunto ai preferiti",
    buy: "Acquista: "
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

export default it
export type Translations = typeof it
