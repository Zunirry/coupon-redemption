import Image from "next/image";
import Link from "next/link";

import type { Product as ProductProps } from "@/app/lib/products";

interface ProductInterface {
  product: ProductProps;
  classNames?: {
    container: string;
  };
  showButton?: boolean;
}

export const Product = (props: ProductInterface) => {
  const { product, showButton } = props;

  return (
    <div
      key={product.id}
      className="bg-white shadow-lg flex justify-start flex-col px-3 py-4 gap-3 rounded-lg"
    >
      <Image
        alt="videogames"
        src={product.image}
        width={500}
        height={800}
        className="max-h-[200px] w-full object-cover"
      />
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl">{product.name}</p>
        <p className="text-sm font-semibold">${product.price}</p>
      </div>
      <p className="text-md">{product.description}</p>
      {showButton && (
        <Link
          href={`/cart/${product.id}`}
          className="bg-green-600 py-2 rounded-lg font-semibold hover:text-white w-full text-center"
        >
          Buy now!
        </Link>
      )}
    </div>
  );
};
