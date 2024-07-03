import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SectionList, Text, View } from "react-native";
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
  const [showFavorites, setShowFavorites] = useState([]);
  const { channelId } = route.params;
  const [showFavoritesTime, setShowFavoritesTime] = useState([]);
  useEffect(() => {
    //useEffect é uma função que roda quando a pag rodar. Entao toda vez que eu abrir a pag de programas ele vai chamar essas funções!
    passPrograms();
    HandleGetFavorites();
  }, []);
  useEffect(() => {
    findFavoritesProgramsTime(showFavorites);
  }, [showFavorites]);

  async function passPrograms() {
    //isso aqui é o que ta buscando os programas pra colocar na tela
    const passPrograms = await GetPrograms(channelId);
    setInfos(passPrograms);
  }

  async function findFavoritesProgramsTime(
    favoriteProgram: FavoriteProgramData[]
  ) {
    const allTheTimes = await GetPrograms(channelId);

    const favoritesTime = [];

    for (const program of allTheTimes) {
      const isDuplicated = favoritesTime.some(
        (item) => program.name == item.name && program.type == item.type
      );
      const isFavorite = favoriteProgram.some(
        (fav) => fav.name === program.name && fav.type === program.type
      );

      if (!isDuplicated && isFavorite) {
        favoritesTime.push(program);
      }
    }
    setShowFavoritesTime(favoritesTime);
    console.log(favoritesTime);
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
    //isso ta mandando o que o usuário quiser favoritar lá AsyncStorage
    const programId = `program${name}from${channelId}`;
    await SaveFavoritesPrograms({ key: programId, name, type, channelId });
    await HandleGetFavorites();
  };

  const HandleGetFavorites = async () => {
    //aqui estamos buscando a informação que o usuário favoritar
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
      }} //todos esses css inline vc pode apagar, fique avonts <3
    >
      <Pressable onPress={() => navigation.goBack()}>
        {/* esse navigation é o que faz a navegação entre as pags, no arquivo router.tsx, que ta dentro da pasta router, salva todas as pags navegaveis, lá é so colocar o nome, e importar o componente. Nesse caso estamos usando GoBack para voltar a pag anterior que o usuário estava. Para mais informações: https://reactnavigation.org/docs/stack-navigator/ ou me chama no zap ;) */}

        <Text>voltar</Text>
      </Pressable>

      <Pressable onPress={() => ClearAll()}>
        <Text>limpar</Text>
      </Pressable>

      <Text style={{ fontSize: 30, fontWeight: 600 }}>Programas</Text>
      <View>
        {showFavorites.map((item, index) => (
          //vamo la, esse showfavorites.map funciona da seguinte forma: o showFavorites é uma array, e o .map faz com que ele leia cada objeto dessa array e passe para o front. Item é o nome que demos para esse objeto que vai ser lido
          <View
            key={index}
            //essa key tem que ser um valor unico de cada um dos items da array, como nao temos um valor que seja unico, estamos usando o index (que é a posição de cada objeto da array)
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
                {/*como la em cima chamamos cada objeto de "item" é desse nome que estamos chamando aqui, e .time é o jeito de especificar qual item da array queremos  */}
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
              {/*aqui esse querido está recebendo a info que o usuário quer favoritar*/}
              <Heart color="#000000" />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}
