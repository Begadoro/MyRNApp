import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"

export interface ButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  text: string,
  textStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

/**
 * Standard customizable button. It takes 100% of width of his parent
 */
export const Button = observer(function Button(props: ButtonProps) {

  const style = getStyles();

  return (
    <TouchableOpacity style={[style.container,props.style]} onPress={props.onPress}>
      <Text style={[style.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  )
})

const getStyles = () => StyleSheet.create({
  container:{
    alignItems: "center",
    backgroundColor: colors.buttonsBg,
    borderRadius: spacing.lg,
    height: 44,
    justifyContent: "center",
    width: "100%"
  },
  text:{
    color: colors.text,
    fontSize: spacing.md,
  }
})