
export type CardType = {
  id: string;
  images: {
    icon: string;
  };
  name: string;
  description: string;
  introduction: {
    backendValue: number;
    chapter: string;
    season: string;
    text: string;
  };
  rarity: {
    value: string;
    displayValue: string;
    backendValue: string;
  },
  type: {
    value: string,
    displayValue: string,
    backendValue: string,
  },
  set: {
    value: string,
    text: string,
    backendValue: string
  }
};

export type Rarities = {
  [key: string]: string;
};

export type SelectedObject = {
  rarity: {
    backendValue: string;
    displayValue: string;
    value: string;
  };
};

export type CosmeticsData = {
  data: {
    data: [object];
  };
  isLoading: boolean;
  isError: boolean;
};