import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/router/router";
import { ClearAll } from "./src/async-storage/favorites-programs-storage";


export default function App() {
  return (
    <>
      <NavigationContainer>
        <Router />
        {/*se quiser testar um componente especifico só importar ele aqui no lugar desse Router, mas nao esquece de colocar de volta se nao quebra toda a navegação entre as pags*/}
      </NavigationContainer>
    </>
  );
}


