"use client";

import { products } from "../lib/products";
import { Product } from "@/components/product";

const Products = () => {
  return (
    <div className="justify-center items-center flex h-screen w-full">
      <div className="flex mx-5 gap-4">
        {products.map((product) => (
          <Product product={product} key={product.id} showButton />
        ))}
      </div>
    </div>
  );
};

export default Products;
