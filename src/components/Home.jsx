function Home({ data }) {
  return (
    <>
      <div className="Home">
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <div className="title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
