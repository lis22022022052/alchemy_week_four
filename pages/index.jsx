import React from "react";
import { useState } from "react";
import { NFTCard } from "../components/nftCard";
import { Pagination } from "../components/pagination";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageKeys, setPageKeys] = useState([""]);

  const getBaseUrl = () => {
    const api_key = "TWOuqthMWIy4KTiLF7APNkSWnUf3U5js";
    return `https://eth-mainnet.alchemyapi.io/v2/${api_key}`;
  };

  const fetchNFTs = async () => {
    console.log("fetching nfts");

    const baseURL = `${getBaseUrl()}/getNFTs/`;
    const fetchURL = !collection
      ? `${baseURL}?owner=${wallet}`
      : `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;

    const requestOptions = {
      method: "GET",
    };

    const nfts = await fetch(fetchURL, requestOptions).then((data) =>
      data.json()
    );

    if (nfts) {
      console.log(`nfts: `, nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async (startToken = "", pageIndex = 0) => {
    if (!collection.length) return;

    const requestOptions = {
      method: "GET",
    };

    const baseURL = `${getBaseUrl()}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${true}&startToken=${startToken}`;

    const nfts = await fetch(fetchURL, requestOptions).then((data) =>
      data.json()
    );

    if (nfts) {
      console.log(`NFTs in collection: `, nfts);
      setNFTs(nfts.nfts);

      console.log("nextToken: ", nfts.nextToken);
      if (!nfts.nextToken) return;

      setPageKeys((prevKeys) => {
        const newKeys = [...prevKeys];
        newKeys[pageIndex + 1] = nfts.nextToken;

        return newKeys;
      });
    }
  };

  const onClickPage = (pageIndex) => {
    if (currentPage === pageIndex) return;

    fetchNFTsForCollection(pageKeys[pageIndex], pageIndex);
    setCurrentPage(pageIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          disabled={fetchForCollection}
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg_slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={wallet}
          type={"text"}
          placeholder="Add your wallet address"
        ></input>
        <input
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg_slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          value={collection}
          type={"text"}
          placeholder="Add the collection address"
        ></input>
        <label className="tet-gray-600">
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
            type={"checkbox"}
          ></input>
          Fetch for collection
        </label>
        <button
          disabled={!wallet && !collection}
          className="disabled: bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else {
              fetchNFTs();
            }
          }}
        >
          Let's go!
        </button>
      </div>
      {pageKeys.length > 1 && (
        <Pagination
          key={"top-pagination-bar"}
          currentPage={currentPage}
          pageKeys={pageKeys}
          onClickPage={onClickPage}
          className="border-t"
        />
      )}
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length &&
          NFTs.map((nft, i) => {
            return <NFTCard nft={nft} key={`nft-card-${i}`} />;
          })}
      </div>
      {pageKeys.length > 1 && (
        <Pagination
          key={"bottom-pagination-bar"}
          currentPage={currentPage}
          pageKeys={pageKeys}
          onClickPage={onClickPage}
          className="border-t"
        />
      )}
    </div>
  );
};

export default Home;
