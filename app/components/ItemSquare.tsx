import * as React from "react"
import { Image, Text, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "app/theme"

export interface ItemSquareProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?: () => void,
  image: any,
  text: string
  price: number
}

/**
 * Describe your component here
 */
export const ItemSquare = observer(function ItemSquare(props: ItemSquareProps) {

  const style = getStyles();

  return (
    <TouchableOpacity onPress={props.onPress} style={[style.container,props.style]}>
      <Image source={props.image} style={style.image}/>
      <View>
        <Text style={style.text}>{props.text}</Text>
        <Text style={[style.text, style.textBold]}>{props.price}€</Text>
      </View>
    </TouchableOpacity>
  )
})

const getStyles = () => StyleSheet.create({
  container:{
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    justifyContent: "center",
  },
  image:{
    borderRadius: spacing.md,
    height: 150,
    width: "100%",
  },
  text:{
    fontSize: spacing.md
  },
  textBold:{
    fontWeight: "bold"
  }
})
