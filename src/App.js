import "./styles.css";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function App() {
  const [allproducts, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  const getProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100", {
      method: "GET"
    });
    const data = await response.json();
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
      console.log(allproducts);
    }
  };
  useEffect(() => {
    //I am fetching api and setting all products on page refresh
    getProducts();
    console.log("useeff");
  }, []);

  return (
    <div className="App">
      {allproducts.length > 0 && (
        <div className="products">
          {allproducts.slice(page * 10, page * 10 + 10).map((obj, ind) => (
            <span key={ind} className="single__product">
              <LazyLoadImage
                src={obj.thumbnail}
                alt={obj.description}
                width="100%"
                height=" 95%"
                effect="blur"
                className="lazyimg"
              />

              {/* <img src={obj.thumbnail} alt={obj.description} /> */}
              <span>{obj.title}</span>
            </span>
          ))}
        </div>
      )}
      {allproducts.length > 0 && (
        <div className="pagination">
          <button
            className={page !== 0 ? "" : "noDisplay"}
            onClick={() => {
              if (page !== 0) {
                return setPage(page - 1);
              }
            }}
          >
            previous
          </button>
          {allproducts.slice(0, allproducts.length / 10).map((item, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={page === index ? "selected__page" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={page !== allproducts.length / 10 - 1 ? "" : "noDisplay"}
            onClick={() => {
              if (page < allproducts.length / 10 - 1) {
                return setPage(page + 1);
                // else{
                //     return ;
                //     // setDisplay.next
                //    }
              }
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
// [...Array(products.length/10)]
