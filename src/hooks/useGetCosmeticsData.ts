import { useState } from "react";
import { CardType } from "../types/types";
import axios from "axios";

export const useGetCosmeticsData = () => {
    const [cosmeticsData, setCosmeticsData] = useState<CardType[]>([]);
    const cosmeticsDataFetching = async () => {
    const response = await axios.get(
      `https://fortnite-api.com/v2/cosmetics/br`
    );
    const responseData: CardType[] = response.data.data;
    setCosmeticsData(responseData);
    };
    return {cosmeticsData, cosmeticsDataFetching}
}