import * as React from "react"
import { StyleProp, StyleSheet, Image, Text, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "app/theme"


export interface CategorySquareProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?: () => void,
  image: any,
  text: string
}

/**
 * Describe your component here
 */
export const CategorySquare = observer(function CategorySquare(props: CategorySquareProps) {

  const style = getStyles();

  return (
    <TouchableOpacity onPress={props.onPress} style={[style.container,props.style]}>
      <Image source={props.image} style={style.image}/>
      <Text style={style.text}>{props.text}</Text>
    </TouchableOpacity>
  )
})

const getStyles = () => StyleSheet.create({
  container:{
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    justifyContent: "center",
  },
  image:{
    borderRadius: spacing.md,
    height: 110,
    width: 110,
  },
  text:{
    fontSize: spacing.sm
  }
})
