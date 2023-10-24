import API from "@services/API";
import { useEffect, useState } from "react";

export default function useSearch(search: string | string[] | undefined) {
  const [keyword, setKeyword] = useState<string | string[] | undefined>();
  const [keywordReset, setKeywordReset] = useState<boolean>();
  const [items, setItems] = useState<ShopItemType[]>();

  const searchItems = async () => {
    const res = await API.item.search(search);
    if (res.statusCode === 2000) {
      setItems(res.result.item);
      setKeyword(search);
      setKeywordReset(true);
    } else alert(res.message);
  };

  useEffect(() => {
    searchItems();
  }, [search]);

  return { items, keyword, setKeyword, keywordReset, setKeywordReset };
}
