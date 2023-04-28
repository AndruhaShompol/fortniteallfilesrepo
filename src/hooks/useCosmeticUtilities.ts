import { useEffect, useState } from "react";
import { CardType } from "../types/types";

export const useCosmeticUtilities = (cosmeticsData: CardType[]) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(100);
  const [selectedRarity, setSelectedRarity] = useState("");
  const [searchCosmetics, setSearchCosmetics] = useState("");
  const [limitedData, setLimitedData] = useState<CardType[]>([]);
  const [filteredCosmeticsData, setFilteredCosmeticsData] = useState<
    CardType[]
  >([]);

    useEffect(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    setLimitedData(filteredCosmeticsData.slice(startIndex, endIndex));
  }, [currentPage, itemPerPage, filteredCosmeticsData]);

  useEffect(() => {
    setFilteredCosmeticsData(
      cosmeticsData
        .filter((element) => {
          if (!selectedRarity) return true;
          return element.rarity.value === selectedRarity;
        })
        .filter((element) =>
          element.name.toLocaleLowerCase().includes(searchCosmetics)
        )
    );
  }, [selectedRarity, searchCosmetics, cosmeticsData]);
    return {setCurrentPage, setSelectedRarity, setSearchCosmetics, selectedRarity, searchCosmetics, limitedData, currentPage, itemPerPage, setItemPerPage, filteredCosmeticsData}
}