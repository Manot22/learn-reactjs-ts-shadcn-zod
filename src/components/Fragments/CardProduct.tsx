import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import type { FC, ReactNode } from "react";

interface CardType {
  children: ReactNode;
  id: number;
}

interface HeaderPropsType {
  title: string;
}

interface BodyPropsType {
  description: string;
  image: string;
  category: string;
  price: number;
}

const CardProductBase: FC<CardType> = ({ children, id }) => {
  return (
    <div
      key={id}
      className="border-2 rounded-lg p-4 flex flex-col w-full md:max-w-sm shadow-sm"
    >
      {children}
    </div>
  );
};

const Header: FC<HeaderPropsType> = ({ title }) => {
  return (
    <Link to="/" className="hover:text-gray-500">
      <h1 className="mb-6 font-semibold">{title}</h1>
    </Link>
  );
};

const Body: FC<BodyPropsType> = ({ description, image, price, category }) => {
  return (
    <>
      <div className="flex items-center gap-4 h-full text-justify">
        <img src={image} alt="" className="w-24 h-24" />
        <p className="text-sm text-gray-500">{description.substring(0, 100)}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2 className="font-semibold">
          Category: <span className="capitalize text-gray-500">{category}</span>
        </h2>
        <p className="font-medium">
          Price: <span className="text-gray-500">{price}$</span>
        </p>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <Button size={"sm"} className="bg-blue-500 hover:bg-blue-700">
        Detail
      </Button>
      <Button size={"sm"} className="bg-green-400 hover:bg-green-700">
        Buy
      </Button>
    </div>
  );
};

type CardProductComponent = FC<CardType> & {
  Header: FC<HeaderPropsType>;
  Body: FC<BodyPropsType>;
  Footer: FC;
};

const CardProduct = CardProductBase as CardProductComponent;
CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
