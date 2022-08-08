import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataInterface {
  id: string;
  industries: string[];
  name: string;
  netWorth: number;
  squareImage: string;
}

const Home: NextPage = () => {
  const [data, setData] = useState<DataInterface[]>();
  useEffect(() => {
    (async () => {
      const data = await (
        await fetch("https://billions-api.nomadcoders.workers.dev/")
      ).json();
      setData(data);
    })();
  }, []);
  return (
    <div className="Container">
      <Head>
        <title>Billions</title>
      </Head>
      <main>
        {data?.slice(0, 100).map((v, i) => (
          <Link key={i} href={`/person/${v.id}`}>
            <a>
              <div>
                <img src={v.squareImage} alt="" />
                <div className="info">
                  <div>{v.name}</div>
                  <div>
                    {v.netWorth.toFixed()} Billion / {v.industries[0]}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </main>
      <style jsx>{`
        .Container {
          display: flex;
          justify-content: center;
        }
        main {
          max-width: 980px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 10px;
        }
        main > div {
          background-color: #131d25;
          padding-bottom: 20px;
        }
        img {
          width: 100%;
        }
        .info {
          padding: 10px;
        }
        .info div:nth-child(1) {
          font-weight: 700;
          margin-bottom: 10px;
        }
        .info div:nth-child(2) {
          font-size: 13px;
        }
      `}</style>
    </div>
  );
};

export default Home;
