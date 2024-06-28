import Image from "next/image";
import styles from "@/style/person.module.css";

interface TPerson {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: TFinancialAsset[];
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

interface TFinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice: number;
}

const fetchPerson = async (name: string): Promise<TPerson> => {
  const data = await fetch(
    `https://billions-api.nomadcoders.workers.dev/person/${name}`
  );
  const json = await data.json();

  return json;
};

const Person = async ({ params }: { params: { id: string } }) => {
  const data = await fetchPerson(params.id);

  return (
    <div className={styles.root}>
      <div>
        {/* 인물 정보 */}
        <div className={styles.personInfoContainer}>
          <Image
            src={data.squareImage}
            alt={data.name}
            width={300}
            height={300}
          />
          <h1 className={styles.name}>{data.name}</h1>
          <h3>
            NetWorth: {Math.floor(data.netWorth).toLocaleString()} Billion
          </h3>
          <h3>Country: {data.country}</h3>
          <h3>Industry: {data.industries[0]}</h3>
          <p className={styles.bio}>
            {data.bio.map((sentence, index) => (
              <span key={index}>
                {sentence}
                <br />
              </span>
            ))}
          </p>
        </div>

        {/* 재정자산 */}
        <div className={styles.financialAssetContainer}>
          <h1 className={styles.name}>Financial Assets</h1>
          <div className={styles.assetContainer}>
            {data.financialAssets?.map((item, index) => (
              <div key={index} className={styles.asset}>
                <span>Ticker: {item.ticker}</span>
                <span>Shares: {item.numberOfShares.toLocaleString()}</span>
                {item.exerciseOptionPrice && (
                  <span>Exercise Price: ${item.exerciseOptionPrice}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
