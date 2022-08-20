import React,{ useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import card from './style.css'
function App() {
  const [items, setItems] = useState([]);
  const [noMore,setNomore] =useState(true);
  const [page,setpage] = useState(2);
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        "https://dummyjson.com/products?limit=10&page=1"
      );
      const data = await res.json();
      setItems(data.products);
      console.log('data',data);
    };
    getProduct();
  }, []);

  const getProductNext = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&page=${page}`);
    const data = await res.json();
    setItems(data.products);
    console.log('data2',data);
  };

  const fetchData =() => {
    const productss = getProductNext();
    setItems([{...items, ...productss}]); 
    if(productss.length ===0 || productss.length<10){
    setNomore(false);
    }
    // setNomore(false);
    setpage(page+1);
  };

  return (
      <div className="card">
      <InfiniteScroll
        dataLength={items?.length} //This is important field to render the next data
        next={fetchData}
        hasMore={noMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <h1>hello</h1>
        {items.map((item) => {
          return (
          <div class="card">
             <div class="container">
            <h4>Name:{item.title}</h4> 
            <p>Description:{item.description}</p> 
          </div>
        </div>
        )
        })}
      </InfiniteScroll>
      </div>

  );
}

export default App;
