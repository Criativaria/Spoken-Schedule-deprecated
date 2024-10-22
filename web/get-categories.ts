import axios from "axios";
import { load } from "cheerio";
import { index } from "cheerio/lib/api/traversing";

//oi amiga nao precisa mexer aqui! É a pag que eu faço o webScrapping das categorias, se quiser eu te explico bonitinho dps

export type Category = {
  name: string;
  id: string;
};

export async function GetCategories() {
  const response = await axios.get("https://meuguia.tv");
  const HtmlReq = load(response.data);

  const Categories: Category[] = [];

  HtmlReq("li").each((_index, element: any) => {

    Categories.push({
      name: HtmlReq(element).find(".licontent h2").text().trim(),
      id: HtmlReq(element).find("a.devicepadding").attr("href").split("/")[3]
    })

  });
  return Categories
}
