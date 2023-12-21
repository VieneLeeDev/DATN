import Image from "next/image";

interface CartProps {
  name: string;
  price: number;
  description?: string;
  city: string;
  img: string;
}

const Card = (props: CartProps) => {
  return (
    <div className="container border-[1px] overflow-hidden hover:opacity-80 hover:cursor-pointer duration-100 h-full">
      <div className="flex relative overflow-hidden aspect-square">
        <Image
          fill
          className="object-cover"
          src={props.img}
          alt="pic"
          sizes="w-full h-full"
        />
        <div className="absolute w-[150px] h-[25px] bg-black bottom-2 left-2 text-center text-white rounded-md">
          <span className="text-sm">{`${props.city}`}</span>
        </div>
      </div>
      <div className="container h-1/4 text-left p-2">
        <h2 className="text-md font-bold text-ellipsis whitespace-wrap overflow-hidden">
          {props.name}
        </h2>
        <p className="text-[#3b4249]">
          <span>
            <strong>€{props.price}</strong>{" "}
          </span>
          per night
        </p>
      </div>
    </div>
  );
};
export default Card;
