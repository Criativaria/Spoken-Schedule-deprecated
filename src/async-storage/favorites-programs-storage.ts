import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "FAVORITES_PROGRAMS";

export type FavoriteProgramData = {
    key: string,
    name: string,
    type: string,
    channelId: string
}

function RemoveDuplicates(programs: FavoriteProgramData[]) {
    const entries = programs.map((programs) => [programs.key, programs]);
    const obj = Object.fromEntries(entries);
    return Object.values(obj)
}

export async function ClearFavorite(program: FavoriteProgramData) {
    try {
        let data: FavoriteProgramData[] = await GetFavoritesPrograms();
        const updatedFavorites = data.filter((item) => item.key !== program.key);
        await SaveNewFavorites(updatedFavorites)
    } catch (error) {
        console.log(error)
    }
}

async function SaveNewFavorites(programs: FavoriteProgramData[]) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
    } catch (error) {
        console.log(error)
    }
}

export async function SaveFavoritesPrograms(program: FavoriteProgramData) {
    try {
        let data: FavoriteProgramData[] = await GetFavoritesPrograms();
        data.push(program);
        const newData = RemoveDuplicates(data)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

        return newData;

    } catch (error) {
        console.log("erro no save-info" + error);
    }
};

export async function GetFavoritesPrograms(channelId?: string) {
    try {
        const storageData = await AsyncStorage.getItem(STORAGE_KEY);
        let data: FavoriteProgramData[] = [];
        if (storageData) {
            data = JSON.parse(storageData);
        }
        if (channelId) {
            return data.filter((program) => program.channelId == channelId)
        }
        return data
    } catch (error) {
        console.log("erro no GetFavoritesPrograms" + error);
    }
};

export async function ClearAll() {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }

    console.log("FEITO.");
};