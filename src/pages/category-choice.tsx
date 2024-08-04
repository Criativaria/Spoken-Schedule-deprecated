import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GetCategories } from "../../web/get-categories";
import { Heart } from "lucide-react-native";
import { GetAllChannels } from "../components/get-all-channels";

export function CategoriesChoice({ navigation }) {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    passCategories();
  }, []);

  useEffect(() => {
    JustIdsArray();
  }, [infos]);

  async function JustIdsArray() {
    const JustId = infos.map((item) => item.id);
    GetAllChannels(JustId);
  }

  async function passCategories() {
    const passCategories = await GetCategories();
    setInfos(passCategories);
  }

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
      <Text style={{ fontSize: 30, fontWeight: 600 }}>Categorias</Text>

      {infos.map((item, index) => (
        <View
          key={index}
          style={{
            borderWidth: 2,
            borderColor: "black",
            borderStyle: "solid",
          }}
        >
          <Pressable
            aria-label={"categoria" + item.name}
            onPress={() =>
              navigation.navigate("BroadcastersChoice", { category: item.id })
            }
          >
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
