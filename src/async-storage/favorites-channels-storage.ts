import AsyncStorage from "@react-native-async-storage/async-storage"
import { GetFavoritesPrograms } from "./favorites-programs-storage"

export type FavoriteChannelData = {
    key: string,
    name: string,
    category: string,
    channelId: string
}
const STORAGE_KEY = "FAVORITE_CHANNELS"

function RemoveDuplicates(channel: FavoriteChannelData[]) {
    const entries = channel.map((channel) => [channel.key, channel]);
    const obj = Object.fromEntries(entries);
    return Object.values(obj)
}

export async function SaveFavoritesChannels(channel: FavoriteChannelData) {
    try {
        let data: FavoriteChannelData[] = await GetFavoritesChannels()
        data.push(channel)
        const newData = RemoveDuplicates(data)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
        return newData;
    } catch (error) {
        console.log("erro no Save Channel")
    }
}
export async function GetFavoritesChannels(category?: string) {
    try {
        const storageData = await AsyncStorage.getItem(STORAGE_KEY)
        let data: FavoriteChannelData[] = [];
        if (storageData) {
            data = JSON.parse(storageData) || [];
        }
        if (category) {
            return data.filter((channel) => channel.category === category)
        }
        return data;
    } catch (error) {
        console.log(`erro no GetFavoritesChannels: ${error}`);
    }
}

export async function RemoveFavorite(channel: FavoriteChannelData) {
    try {
        let data: FavoriteChannelData[] = await GetFavoritesChannels();
        const updatedFavorites = data.filter((item) => item.key !== channel.key);
        await SaveNewFavoritesChannels(updatedFavorites)
    } catch (error) {
        console.log(error + "error no remove favorite")
    }
}

export async function SaveNewFavoritesChannels(channels: FavoriteChannelData[]) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(channels))
    } catch (error) {
        console.log(error)
    }

}

export async function ClearAll() {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log(e)
    }

    console.log('FEITO.')
}

