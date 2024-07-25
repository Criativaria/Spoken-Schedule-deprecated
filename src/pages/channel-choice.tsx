import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GetCategories } from "../../web/get-categories";
import { Broadcaster, GetBroadcasters } from "../../web/get-broadcasters";
import { Heart, Trash } from "lucide-react-native";
import {
  clearAll,
  FavoriteChannelData,
  GetFavoritesChannels,
  RemoveFavorite,
  SaveFavoritesChannels,
} from "../async-storage/favorites-channels-storage";
import { info } from "console";
import { ClearAll } from "../async-storage/favorites-programs-storage";

export function ChannelChoice({ route, navigation }) {
  const { category } = route.params;
  const [infos, setInfos] = useState<Broadcaster[]>([]);
  const [showFavorites, setShowFavorites] = useState([]);

  useEffect(() => {
    passBroadcaster();
    GetFavorites();
  }, []);

  async function passBroadcaster() {
    const passPrograms = await GetBroadcasters(category);
    setInfos(passPrograms);
  }

  const GetFavorites = async () => {
    const info: FavoriteChannelData[] = await GetFavoritesChannels(category);
    setShowFavorites(info);
  };

  const SaveFavorites = async (name: string, channelId: string) => {
    const Channelkey = `channel${name}from${category}`;

    if (showFavorites.length <= 4) {
      await SaveFavoritesChannels({
        key: Channelkey,
        name,
        category,
        channelId,
      });
      await GetFavorites();
    } else {
      return alert("nao pode nao viu");
    }
  };

  const HandleRemoveFavorite = async (name: string) => {
    const info = await GetFavoritesChannels(category);
    if (info) {
      const channelToRemove = info.find((element) => element.name == name);
      if (channelToRemove) {
        await RemoveFavorite(channelToRemove);
      }
      await GetFavorites();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: 100,
        gap: 30,
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Text>voltar</Text>
      </Pressable>
      <Text style={{ fontSize: 30, fontWeight: 600 }}>Canais</Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          marginTop: 50,
          gap: 30,
        }}
      >
        {showFavorites.map((item, index) => (
          <View
            key={index}
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderStyle: "solid",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 150,
              height: 50,
            }}
          >
            <View key={index}>
              <Pressable
                onPress={() =>
                  navigation.navigate("ProgramsChoice", {
                    channelId: item.channelId,
                  })
                }
              >
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => HandleRemoveFavorite(item.name)}>
              <Trash color="#000000" />
            </Pressable>
          </View>
        ))}

        {infos.map((item, index) => (
          <View
            key={index}
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderStyle: "solid",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 150,
              height: 50,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("ProgramsChoice", {
                  channelId: item.id,
                })
              }
            >
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </Pressable>
            <Pressable onPress={() => SaveFavorites(item.name, item.id)}>
              <Heart color="#000000" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
