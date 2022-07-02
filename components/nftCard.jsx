import React from "react";
import { BiCopy } from "react-icons/bi";

export const NFTCard = ({ nft }) => {
  const gateway = nft.media[0].gateway;
  const title = nft.title === "" ? "Empty Title" : nft.title;
  const address = nft.contract.address;
  const tokenId = nft.id.tokenId.substr(nft.id.tokenId.length - 4);
  const textAddress = `${nft.contract.address.substr(0, 4)}
  ...${nft.contract.address.substr(nft.contract.address.length - 4)}`;
  const description = nft.descritpion?.substr(0, 150);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="w-1/4 flex flex-col">
      <div className="rounded-md">
        <img className="object-cover h-128 w-full rounded-t-md" src={gateway} />
      </div>

      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
        <div className="">
          <h2 className="text-xl text-gray-800">{title}</h2>
          <p className="text-gray-600">{tokenId}</p>

          <div className="flex flex-row">
            <p
              className="cursor-pointer hover:text-gray-400 active:text-gray-400 row-end"
              onClick={copyAddress}
              title="Copy"
            >
              <BiCopy /> 
            </p>
            <p className="text-gray-600">{textAddress}</p>
          </div>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="flex justify-center mb-1">
          <a
            className="py-2 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer"
            target={"_blnak"}
            href={`https://etherscan.io/token/${address}`}
          >
            View on etherscan
          </a>
        </div>
      </div>
    </div>
  );
};
