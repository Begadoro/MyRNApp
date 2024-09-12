import * as React from "react"
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Feather } from "@expo/vector-icons"

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
  icon? : typeof Feather[keyof typeof Feather]
  onEndEditing?: () => void
}

/**
 * Describe your component here
 */
export const CustomInput = observer(function CustomInput(props: CustomInputProps) {

  const style = getStyles();

  return (
    <View style={[style.root, props.errors && style.error]}>
      {props.icon ? <Feather name={props.icon} size={spacing.md} color={props.errors ? "red" : colors.border}/> : null}
      <TextInput
        style={style.container}
        onBlur={props.onBlur}
        onChangeText={(value) => props.onChange(value)}
        value={props.value}
        placeholder={props.placeholder ?? "Enter text"}
        placeholderTextColor={colors.border}
        secureTextEntry={props.type === "password"}
        onEndEditing={props.onEndEditing}
      />
    </View>

  )
})

const getStyles = () => StyleSheet.create({
  container:{
    color: colors.text,
    height: "100%",
    width: "90%"
  },
  error:{
    borderColor: "red",
    borderWidth: 1,
    color: "red",
  },
  root:{
    alignItems: "center",
    backgroundColor:"#dfdfdf",
    borderRadius: spacing.md,
    display: "flex",
    flexDirection: "row",
    gap: spacing.sm,
    height: 44,
    paddingHorizontal: spacing.md,
    width: "100%",
  },
})