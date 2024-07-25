import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Broadcaster, GetBroadcasters } from "../../../web/get-broadcasters";

export type BroadcastersProps = {
  category: string;
};

export function Broadcasters(props: BroadcastersProps) {
  const [infos, setInfos] = useState<Broadcaster[]>([]);

  useEffect(() => {
    PassBroadcaster();
  }, []);

  async function PassBroadcaster() {
    const passPrograms = await GetBroadcasters(props.category);
    setInfos(passPrograms);
  }

  return (
    <View>
      {infos.map((item, index) => (
        <View
          key={index}
          style={{
            borderWidth: 2,
            borderColor: "black",
            borderStyle: "solid",
          }}
        >
          <Text>{item.name}</Text>
          <Text>{item.id}</Text>
        </View>
      ))}
    </View>
  );
}
