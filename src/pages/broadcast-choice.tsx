import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GetCategories } from "../../web/get-categories";
import { Broadcaster, GetBroadcasters } from "../../web/get-broadcasters";

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
              onPress={() =>
                navigation.navigate("ProgramsChoice", {
                  channelId: item.id,
                })
              }
            >
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
