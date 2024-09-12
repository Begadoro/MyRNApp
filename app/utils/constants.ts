import { TextStyle } from "react-native"
import { spacing } from "app/theme"

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const h1: TextStyle = {
  fontSize: spacing.xl
}

export const h2: TextStyle = {
  fontSize: spacing.lg
}

export const h3: TextStyle = {
  fontSize: spacing.md
}

export const bold: TextStyle = {
  fontWeight: "bold"
}

export const categories = [
  {id: 1, name: "Fish", image: { uri: ("https://loremflickr.com/126/1119?lock=4367885805325087") }},
  {id: 2, name: "Towels", image: { uri: ("https://loremflickr.com/2277/1940?lock=7998478386322990") }},
  {id: 3, name: "Computer", image: { uri: ("https://loremflickr.com/2739/989?lock=4861779448760869") }},
  {id: 4, name: "Ball", image: { uri: ("https://loremflickr.com/2422/3348?lock=2675313204322099") }},
]