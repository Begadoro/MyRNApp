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
  {id: 1, name: "Home", image: require("../../assets/images/home.png")},
  {id: 2, name: "Clothes", image: require("../../assets/images/clothes.png")},
  {id: 3, name: "Tech", image: require("../../assets/images/tech.jpg")},
  {id: 4, name: "Pets", image: require("../../assets/images/pets.jpg")},
]