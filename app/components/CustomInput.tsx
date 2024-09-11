import * as React from "react"
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"

export interface CustomInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onBlur?: () => void
  onChange: (value: string) => void
  value: string
  placeholder?: string
  type?: "password" | "text",
  errors?: any
}

/**
 * Describe your component here
 */
export const CustomInput = observer(function CustomInput(props: CustomInputProps) {

  const style = getStyles();

  return (
    <TextInput
      style={[style.container, props.errors && style.error]}
      onBlur={props.onBlur}
      onChangeText={(value) => props.onChange(value)}
      value={props.value}
      placeholder={props.placeholder ?? "Enter text"}
      placeholderTextColor={colors.border}
      secureTextEntry={props.type === "password"}
    />
  )
})

const getStyles = () => StyleSheet.create({
  container:{
    backgroundColor: "#dfdfdf",
    borderRadius: spacing.md,
    color: colors.text,
    height: 44,
    paddingHorizontal: spacing.md,
    width: "100%"
  },
  error:{
    borderColor: "red",
    borderWidth: 1,
    color: "red",
  },
})