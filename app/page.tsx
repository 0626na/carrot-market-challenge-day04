import Image from "next/image";
import styles from "@/style/home.module.css";
import Link from "next/link";
interface TBillion {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

const fetchData = async (): Promise<TBillion[]> => {
  const data = await fetch(" https://billions-api.nomadcoders.workers.dev");
  const json = await data.json();
  return json;
};

export default async function Home() {
  const data = await fetchData();

  return (
    <main className={styles.container}>
      <div className={styles.home}>
        {data.map((item) => (
          <Link key={item.id} href={`/person/${item.id}`} prefetch>
            {/* 프로필 이미지 */}
            <div className={styles.pictureContainer}>
              <Image
                className={styles.picture}
                src={item?.squareImage}
                alt={item.name}
                fill
              />
            </div>

            {/* 이름 및 카테고리 */}
            <div className={styles.profile}>
              <h1 className={styles.name}>{item.name}</h1>
              <h3>
                {Math.round(item.netWorth)} Billion / {item.industries[0]}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
