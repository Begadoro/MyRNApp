import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, CustomHeader, CustomInput, Heading, Loader, Screen } from "app/components"
import { Controller, useForm } from "react-hook-form"
import { colors, spacing } from "app/theme"
import { api } from "app/services/api"
import { emailRegex } from "app/utils/constants"
import { useStores } from "app/models"
import { translate } from "app/i18n"
import { ErrorAlert } from "app/utils/errorAlert"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation}) {
  const style = getStyles();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { UserStore } = useStores();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      header: () => (
        <CustomHeader
          leftComponent={
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={{ color: colors.buttonsBg }}>{translate("common.back")}</Text>
            </TouchableOpacity>
          }
        />
      ),
    })
  });
  const submit = async (data : any) => {
    setIsLoading(true);
    const res = await api.executeLogin(data.email, data.password);
    if(res.ok){
      UserStore.setIsLoggedIn(true);
      navigation.navigate("Home");
    } else {
      ErrorAlert(res);
    }
    setIsLoading(false);
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
            rules={{ required: true, minLength: 8 }}
          />
          {(errors.email || errors.password) && <Text style={{color: "red"}}>{translate("loginScreen.missingFields")}</Text>}
        </View>
        <Button text={"Login"} onPress={handleSubmit(submit)} textStyle={{color: "white"}} />
      </KeyboardAvoidingView>
      <Loader isLoading={isLoading}/>
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