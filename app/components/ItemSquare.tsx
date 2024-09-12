import * as React from "react"
import { Image, Text, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "app/theme"
import { ProductFromAPI } from "app/services/api"

export interface ItemSquareProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?: () => void,
  product: ProductFromAPI
}

/**
 * Describe your component here
 */
export const ItemSquare = observer(function ItemSquare(props: ItemSquareProps) {

  const style = getStyles();

  return (
    <TouchableOpacity onPress={props.onPress} style={[style.container,props.style]}>
      <Image source={{ uri: props.product.image}} style={style.image}/>
      <View style={style.infosContainer}>
          <Text style={[style.text, style.textBold]} numberOfLines={1}>{props.product.title}</Text>
          <Text style={style.text} numberOfLines={1}>This is a particular kind of {props.product.title}</Text>
      </View>

    </TouchableOpacity>
  )
})

const getStyles = () => StyleSheet.create({
  container:{
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "flex-start",
    maxHeight: 100,
    width: "100%"
  },
  image:{
    borderRadius: spacing.md,
    height: 80,
    width: 80,
  },
  infosContainer:{
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text:{
    fontSize: spacing.md,
  },
  textBold:{
    fontWeight: "bold"
  },
})
