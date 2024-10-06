export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "01b93f8b-a2ab-48c4-aac4-aea6d4cc8b1b",
    name: "Xbox One Series X",
    price: 5000,
    image: "/xbox.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione magnam iste adipisci corporis ducimus ipsam doloribus",
  },
  {
    id: "472b9681-52ed-4b1f-b013-8197e250a286",
    name: "Steam Deck",
    price: 7000,
    image: "/steam-deck.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione magnam iste adipisci corporis ducimus ipsam doloribus",
  },
  {
    id: "f0c07d33-bcbb-4b2b-924a-e8e0f9f62170",
    name: "Play Station 5",
    price: 8000,
    image: "/ps5.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione magnam iste adipisci corporis ducimus ipsam doloribus",
  },
];
