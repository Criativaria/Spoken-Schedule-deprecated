import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GetPrograms, Program } from "../../web/get-programs";
import { Heart, Trash2 } from "lucide-react-native";
import {
  SaveFavoritesPrograms,
  GetFavoritesPrograms,
  ClearAll,
  ClearFavorite,
  FavoriteProgramData,
} from "../async-storage/favorites-programs-storage";

export function ProgramsChoice({ route, navigation }) {
  const [infos, setInfos] = useState<Program[]>([]);
  const { channelId } = route.params;

  const [showFavorites, setShowFavorites] = useState([]);
  const [showFavoritesTime, setShowFavoritesTime] = useState([]);

  useEffect(() => {
    PassPrograms();
    HandleGetFavorites();
  }, []);

  useEffect(() => {
    FindFavoritesProgramsTime(showFavorites);
  }, [showFavorites]);

  async function PassPrograms() {
    const passPrograms = await GetPrograms(channelId);
    setInfos(passPrograms);
  }

  async function FindFavoritesProgramsTime(
    favoriteProgram: FavoriteProgramData[]
  ) {
    const allTheTimes = await GetPrograms(channelId);

    const favoritesTime = [];

    for (const program of allTheTimes) {
      const isFavorite = favoriteProgram.some(
        (fav) => fav.name === program.name && fav.type === program.type
      );
      const isDuplicated = favoritesTime.some(
        (item) => program.name == item.name && program.type == item.type
      );

      if (!isDuplicated && isFavorite) {
        favoritesTime.push(program);
      }
    }
    setShowFavoritesTime(favoritesTime);
  }

  async function RemoveFavoritesItem(name: string, type: string) {
    const info = await GetFavoritesPrograms(channelId);
    if (info) {
      const programToRemove = info.find(
        (element) => element.name === name && element.type === type
      );
      if (programToRemove) {
        await ClearFavorite(programToRemove);
      }
      await HandleGetFavorites();
    }
  }

  const HandleSaveFavorites = async (name: string, type: string) => {
    if (showFavorites.length <= 9) {
      const programId = `program${name}from${channelId}`;
      await SaveFavoritesPrograms({ key: programId, name, type, channelId });
      await HandleGetFavorites();
    } else {
      return alert("pode nao viu");
    }
  };

  const HandleGetFavorites = async () => {
    const info = await GetFavoritesPrograms(channelId);
    setShowFavorites(info);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: 100,
        gap: 40,
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Text>voltar</Text>
      </Pressable>

      <Pressable onPress={() => ClearAll()}>
        <Text>limpar</Text>
      </Pressable>

      <Text style={{ fontSize: 30, fontWeight: 600 }}>Programas</Text>
      <View>
        {showFavorites.map((item, index) => (
          <View
            key={index}
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderStyle: "solid",
              width: 150,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                {showFavoritesTime.map(
                  (time, index) =>
                    item.name == time.name &&
                    item.type == time.type && (
                      <View key={index}>
                        <Text>{time.time}</Text>
                      </View>
                    )
                )}
                <Text>{item.name}</Text>
                <Text>{item.type}</Text>
              </View>
              <Pressable
                onPress={() => RemoveFavoritesItem(item.name, item.type)}
              >
                <Trash2 color="#000000" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {infos.map((item, index) => (
        <View
          key={index}
          style={{
            borderWidth: 2,
            borderColor: "black",
            borderStyle: "solid",
            width: 150,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text>{item.time}</Text>
              <Text>{item.name}</Text>
              <Text>{item.type}</Text>
            </View>
            <Pressable
              onPress={() => HandleSaveFavorites(item.name, item.type)}
            >
              <Heart color="#000000" />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}
