import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IFinancial {
  ticker: string;
  numberOfShares: number;
  exerciseOptionPrice?: number;
}

interface IData {
  bio: string[];
  country: string;
  financialAssets: IFinancial[];
  industries: string[];
  name: string;
  netWorth: number;
  squareImage: string;
}

const DetailInfo: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const [data, setData] = useState<IData>();
  useEffect(() => {
    (async () => {
      const data = await (
        await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
      ).json();
      setData(data);
    })();
  }, []);
  return (
    <div className="container">
      <div className="detail">
        <img src={data?.squareImage} alt="" />
        <div>{data?.name}</div>
        <div>Networth: {data?.netWorth.toFixed()} Billion</div>
        <div>Country: {data?.country}</div>
        <div>Industry: {data?.industries[0]}</div>
        <div>
          {data?.bio?.map((v, i) => (
            <span key={i}>{v} </span>
          ))}
        </div>
      </div>
      <div className="financial">
        <div>financial assets</div>
        <div className="assets">
          {data?.financialAssets?.map((v, i) => (
            <div key={i} className="financialInfo">
              <div>Ticker: {v?.ticker}</div>
              <div>Shares: {v?.numberOfShares?.toLocaleString("en-US")}</div>
              {v?.exerciseOptionPrice ? (
                <div>Excersie Price: ${v.exerciseOptionPrice}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .detail,
        .financial {
          background-color: #131d25;
          padding: 4rem 1.5rem;
          width: 100%;
          max-width: 980px;
        }
        .detail {
          margin-bottom: 4rem;
        }
        img {
          width: 40%;
          min-width: 300px;
          margin-bottom: 20px;
        }
        .detail > div:nth-child(2) {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 25px;
        }
        .detail > div:not(last-child) {
          margin-bottom: 15px;
        }
        .detail > div:last-child {
          line-height: 22px;
        }

        .financial > div:first-child {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .assets {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .financialInfo {
          padding: 15px;
          border: 1px solid white;
          border-radius: 5px;
          margin: 10px;
        }
        .financialInfo > div:not(last-child) {
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
};

export default DetailInfo;
