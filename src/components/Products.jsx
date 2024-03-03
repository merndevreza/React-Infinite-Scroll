import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Product from "./Product";
const productsPerPage = 10;
const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  useEffect(() => {
    //step-4
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          productsPerPage * page
        }`
      );
      const data = await response.json();
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };
    //step-3
    const onIntersecting = (items) => {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting) {
        fetchProducts();
      }
    };
    //step-1
    const observer = new IntersectionObserver(onIntersecting);

    //step-2
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    //  cleanup
    return () => {
      observer.disconnect();
    };
  }, [page]);
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <Product
          title={product.title}
          thumbnail={product.thumbnail}
          price={product.price}
          key={product.id}
        />
      ))}
      {hasMore && <div ref={loaderRef}>Loading....</div>}
    </div>
  );
};

export default Products;
