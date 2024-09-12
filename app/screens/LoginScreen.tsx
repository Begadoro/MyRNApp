import React, { FC, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, CustomInput, Heading, Screen } from "app/components"
import { Controller, useForm } from "react-hook-form"
import { colors, spacing } from "app/theme"
import { api } from "app/services/api"
import { emailRegex } from "app/utils/constants"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation}) {
  const style = getStyles();
  const { control, handleSubmit, formState: { errors } } = useForm();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerRight: () =>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.buttonsBg }}>Back</Text>
        </TouchableOpacity>
    })
  });
  const submit = async (data : any) => {
    const loginRequest = await api.executeLogin(data.email, data.password);
    if(loginRequest.ok){
      navigation.navigate("Home");
    } else {
      Alert.alert("Login failed", loginRequest.data.error);
    }
  }

  return (
    <Screen style={style.root} preset="fixed">
      <KeyboardAvoidingView style={style.container}>
        <Heading text={"Marketplace"}/>
        <View style={style.inputsContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                icon={"mail"}
                onChange={onChange}
                value={value}
                placeholder={"Email"}
                errors={errors.email}
              />
            )}
            name="email"
            rules={{ required: true, minLength: 4, pattern: emailRegex }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                icon={"lock"}
                onChange={onChange}
                value={value}
                placeholder={"Password"}
                onBlur={onBlur}
                type="password"
                errors={errors.password}
              />
            )}
            name="password"
            rules={{ required: true, minLength: 4 }}
          />
          {(errors.email || errors.password) && <Text style={{color: "red"}}>Password or email fields are not correctly filled</Text>}
        </View>
        <Button text={"Login"} onPress={handleSubmit(submit)} textStyle={{color: "white"}} />
      </KeyboardAvoidingView>
    </Screen>
  )
})

const getStyles = () => StyleSheet.create({
  container:{
    alignItems: "center",
    backgroundColor: colors.background,
    gap: spacing.lg,
    height: "100%",
    justifyContent: "center",
    padding: spacing.md,
    width: "100%"
  },
  inputsContainer:{
    flexDirection: "column",
    gap: spacing.sm,
    width: "100%"
  },
  root:{
    flex: 1
  },
  titleContainer:{
    width: "100%"
  },
  title:{
    color: colors.buttonsBg,
    fontSize: spacing.lg,
    fontWeight: "bold",
  }
})