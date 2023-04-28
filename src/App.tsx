import "./App.css";
import { useQuery } from "react-query";
import {
  Card,
  Pagination,
  Spin,
  Result,
  Empty,
  ConfigProvider,
  Layout,
  Select,
  Input,
  Modal,
} from "antd";
import { SelectValue } from "antd/lib/select";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CardType } from "./types/types";
import { useGetCosmeticsData } from "./hooks/useGetCosmeticsData";
import { rarities } from "./rarity-colors/rarityColors";
import { useCosmeticUtilities } from "./hooks/useCosmeticUtilities";

const { Meta } = Card;
const { Header } = Layout;
const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: "white" }} spin />
);

function App(): JSX.Element {
  const { isLoading, isError } = useQuery(["cosmetics"], () => cosmeticsDataFetching(),{refetchOnWindowFocus: false});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const { cosmeticsData, cosmeticsDataFetching } = useGetCosmeticsData();
  const {
    selectedRarity,
    searchCosmetics,
    limitedData,
    currentPage,
    itemPerPage,
    filteredCosmeticsData,
    setCurrentPage,
    setSelectedRarity,
    setSearchCosmetics,
    setItemPerPage,
  } = useCosmeticUtilities(cosmeticsData);

  if (isLoading)
    return (
      <div className="loadingWrapper">
        <Spin indicator={antIcon} />
      </div>
    );

  if (isError)
    return (
      <div className="errorWrapper">
        <Result
          title="Oops! Something went wrong!"
          subTitle="Failed to fetch data. Please try again later."
        />
      </div>
    );

  


  const card = () => {
    if (!filteredCosmeticsData.length) return (
      <Empty
        style={{
          margin: "100px",
          fontFamily: "Luckiest Guy",
        }}
      />
    );
    return (
      <>
        <div className="cardWrapper">
          {limitedData.map((card: CardType) => (
            <Card
              onClick={() => handleCardClick(card)}
              key={card.id}
              hoverable
              style={{
                width: 240,
                fontFamily: "Luckiest Guy",
                backgroundImage:
                  "linear-gradient(to right, #ff8300, #8600ffeb)",
                border: "10px solid",
                borderColor: rarities[card.rarity.value.toLowerCase()],
                margin: "10px",
              }}
              cover={<img alt="example" src={card.images.icon} />}
            >
              <Meta title={card.name} description={card.description} />
            </Card>
          ))}
        </div>
        <div className="paginationWrapper">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "black",
                colorBgContainer: "rgb(188 67 255)",
                fontFamily: "Luckiest Guy",
                colorBgElevated: "rgb(188 67 255)",
              },
            }}
          >
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={currentPage}
              pageSize={itemPerPage}
              total={filteredCosmeticsData.length}
              onChange={hanldePageChange}
            />
          </ConfigProvider>
        </div>
      </>
    );
  }

  const cosmeticsOptions = (): { value: string; label: string }[] => {
    if (cosmeticsData) {
      const cosmeticsRaritiesSet = new Set<string>();
      cosmeticsData.forEach((cosmeticsRarity: CardType, index: number) => {
        cosmeticsRaritiesSet.add(cosmeticsRarity.rarity.value);
      });

      const cosmeticsRaritiesOptions = Array.from(cosmeticsRaritiesSet).map(
        (value: string, index: number) => ({
          value: value,
          label: value,
        })
      );

      return [
        { value: "", label: "All cosmetics" },
        ...cosmeticsRaritiesOptions,
      ];
    }

    return [];
  };

  const hanldePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (page: number, pageSize: number) => {
    setItemPerPage(pageSize);
    setCurrentPage(page);
  };

  const handleSelectChange = (option: SelectValue) => {
    setSelectedRarity(option as string);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCosmetics(e.target.value);
  };

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Header className="header">
        <span className="headerTitle">Fortnite cosmetisc list</span>
      </Header>
      <div className="searchAndFilterWrapper">
        <div className="select">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "black",
                colorBgContainer: "rgb(188 67 255)",
                fontFamily: "Luckiest Guy",
                colorBgElevated: "rgb(188 67 255)",
                colorBorder: "rgb(244 120 25)",
              },
            }}
          >
            <Select
              defaultValue="Sort by rarity"
              style={{ width: 200 }}
              onChange={handleSelectChange}
              options={cosmeticsOptions()}
              value={selectedRarity}
            />
          </ConfigProvider>
        </div>
        <div className="input">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "black",
                colorBgContainer: "rgb(188 67 255)",
                fontFamily: "Luckiest Guy",
                colorBorder: "rgb(244 120 25)",
              },
            }}
          >
            <Input
              placeholder="Search cosmetics..."
              style={{ width: 200 }}
              value={searchCosmetics}
              onChange={handleSearch}
            />
          </ConfigProvider>
        </div>
      </div>
      {card()}
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: "rgb(244 120 25)",
            fontFamily: "Luckiest Guy",
            colorText: "rgb(19 15 2 / 62%)",
          },
        }}
      >
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          bodyStyle={{ height: "300px", fontSize: "large" }}
          width={800}
        >
          {selectedCard && (
            <div key={selectedCard.id} className="modalWrapper">
              <div className="modalImageNameWrapper">
                <img
                  alt="example"
                  src={selectedCard.images.icon}
                  className="image"
                />
                <div className="modalNameDescription">
                  <div className="modalName">{selectedCard.name}</div>
                  <br />
                  <div className="modalDescription">
                    {selectedCard.description}
                  </div>
                  <div className="modalRarity">
                    Rarity: {selectedCard.rarity.displayValue}
                  </div>
                  <div className="modalType">
                    Type: {selectedCard.type.displayValue}
                  </div>
                  <div className="modalSet">
                    This is the {selectedCard.set.text}
                  </div>
                  <div className="modalIntroduction">
                    {selectedCard.introduction.text}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
      
    </div>
  );
}

export default App;
