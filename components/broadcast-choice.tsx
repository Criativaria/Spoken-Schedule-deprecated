import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GetCategories } from "../web/get-categories";
import { Broadcaster, GetBroadcasters } from "../web/get-broadcasters";
import { BroadcastersProps } from "./web-testers/broadcasters";

export function BroadcastersChoice({ route, navigation }) {
  const [infos, setInfos] = useState<Broadcaster[]>([]);
  const { category } = route.params;

  useEffect(() => {
    passBroadcaster();
  }, []);

  async function passBroadcaster() {
    const passPrograms = await GetBroadcasters(category);
    setInfos(passPrograms);
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
      <Pressable onPress={() => navigation.goBack()}>
        <Text>voltar</Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          marginTop: 100,
          gap: 30,
        }}
      >
        {infos.map((item, index) => (
          <View key={index}>
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
