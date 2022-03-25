# Infinite SWAPI
Aplicacao consumindo api do [Star Wars](https://swapi.dev/),usando scroll infinito


# Motivação 
Aplicar os conceitos do useInfiniteQuery consumindo quase aproximademente 800 dados


# Feature
- UseInfiniteQuery possibilita de forma simples realizar paginações, por exemplo, com scroll, consumindo bastante dados
- Ele vai utilizar um pageParam para verificar qual e a próximo dado que ele precisa carregara traves do getNextPageParam
- No exemplo abaixo, o parâmetro  [.next])(https://swapi.dev/api/species/) disponibilizado pela própria api,este parâmetro referencia a proxima pagina
- Usei o componente [infite scroll](https://www.npmjs.com/package/react-infinite-scroller) para auxiliar 
- Ele espera o hasMore um boolean que verifica se possui ou não mais paginas, neste caso usamos próprio hasNextPage do useINfiniteQuery
- Também o componente aguarda loadMore, basicmanete seria o próximo fetch 
- O useInfiteQuery em sua data vai retornar um array em pages. Por isso data.pages.map
 


```javascript
const { hasNextPage, isLoading, fetchNextPage, data, error, isFetching } =
    useInfiniteQuery(
      "species",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPageData) => lastPageData.next || undefined,
      }
    );


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



```

