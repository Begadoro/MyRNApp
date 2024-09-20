import AsyncStorage from "@react-native-async-storage/async-storage"

export async function useCachedResult (key: string | number){
    const cacheContent = await AsyncStorage.getItem(key.toString());
    if(cacheContent){
        const nowTimestamp = new Date().getTime();
        const { timestamp, data } = JSON.parse(cacheContent)

        if(!timestamp || !data) return null;
        if((nowTimestamp - timestamp) >= 10000) return null;
        return data
    }
    return null;
}
