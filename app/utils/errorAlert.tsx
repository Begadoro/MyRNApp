import { Alert } from "react-native"
import { translate } from "app/i18n"
import { StandardResponse } from "app/services/api"

export const ErrorAlert = (response: StandardResponse) => {
    let message;
    if(response.data && response.data.message) message = response.data.message;
    else message = translate("common.somethingWrong");
    Alert.alert(translate("common.error"), message);
}