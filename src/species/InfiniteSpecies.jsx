import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { hasNextPage, isLoading, fetchNextPage, data, error, isFetching } =
    useInfiniteQuery(
      "species",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPageData) => lastPageData.next || undefined,
      }
    );
  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {data.pages.map((speciesData) => {
        const random = parseFloat(Math.random() * 1000000);
        return speciesData.results.map((specie) => (
          <Species
            key={`${specie.name}-${random}-${specie.language}`}
            name={specie.name}
            language={specie.language}
            averageLifespan={specie.average_lifespan}
          />
        ));
      })}
      {isFetching && <div className="loading">Loading...</div>}
    </InfiniteScroll>
  );
}
