export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: crypto.randomUUID(),
    name: "Xbox One Series X",
    price: 5000,
    image: "/xbox.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione magnam iste adipisci corporis ducimus ipsam doloribus",
  },
  {
    id: crypto.randomUUID(),
    name: "Steam Deck",
    price: 7000,
    image: "/steam-deck.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione magnam iste adipisci corporis ducimus ipsam doloribus",
  },
  {
    id: crypto.randomUUID(),
    name: "Play Station 5",
    price: 8000,
    image: "/ps5.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione magnam iste adipisci corporis ducimus ipsam doloribus",
  },
];
