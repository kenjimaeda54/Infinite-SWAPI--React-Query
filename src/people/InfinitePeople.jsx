import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};
//https://github.com/danbovey/react-infinite-scroller#readme
export function InfinitePeople() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    "swi-infinite",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      //next e o parâmetro que esta na docs da ulr "https://swapi.dev/api/people/",
      // este lastPageData pode ser qualquer coisa,
      //se nao existir mais parâmetro ele pode retornar undefined,segundo a docs null
      getNextPageParam: (lastPageData) => lastPageData.next || undefined,
    }
  );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">{error}</div>;

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {/* infinite  scroll retorna um data.pages,cada page e um array de data.Este data e literalmente
      retorno da api */}
        {data.pages.map((personData) => {
          // personData sera o retorno da api nesse caso,nossa api e um objeto grande,oque eu desejo esta em results
          const idRandom = parseFloat(Math.random() * 1000000);
          return personData.results.map((person) => (
            <Person
              key={`${person.name}-${idRandom}-${person.hair_color}`}
              name={person.name}
              eyeColor={person.eye_color}
              hairColor={person.hair_color}
            />
          ));
        })}
        {/* aqui precisa ser o isFetching,se for true,ele vai mostrar um loading,se for false,ele vai mostrar o loading */}
        {isFetching && <div className="loading">Loading...</div>}
      </InfiniteScroll>
    </>
  );
}
