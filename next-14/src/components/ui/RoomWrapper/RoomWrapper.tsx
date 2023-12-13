import Image from "next/image";
import LinkButton from "../LinkButton/LinkButton";

const RoomWrapper = () => {
  return (
    <div className="flex flex-col md:flex-row container p-5 shadow-lg border-[1px] rounded-lg justify-between my-5">
      <div className="relative w-1/3 bg-black overflow-hidden aspect-square">
        <Image
          fill
          className="object-cover object-center"
          src="https://themes.getmotopress.com/booklium-default/wp-content/uploads/sites/29/2019/08/Beachfront-Villa-Casa-Aurora-892x892.jpg"
          alt="pic"
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex space-y-5 md:flex-[2] py-5 md:py-0 md:px-5 flex-col">
          <h2 className="text-xl font-bold">Name of The Room</h2>
          {/** short atribute */}
          <span>Rate: ***</span>
          {/** description */}
          <p className="text-[#3b4249]">
            Let yourself fully relax in our luxurious favorable accommodations
            with lots of facilities and high-level service. We do our best to
            make you always content, smiling and satisfied.
          </p>
          {/** sumary*/}
          <div className="text-[#3b4249]">2 single beds, 2 twin beds</div>
        </div>
        <div className="flex flex-col flex-[1] space-y-5">
          <p className="flex flex-col text-ledt md:text-center">
            <span className="block"> Price start at:</span>
            <span>
              <strong>$60</strong>/per night
            </span>
          </p>
          <LinkButton classCustom="flex-1" href="/detailroom">View Detail</LinkButton>
        </div>
      </div>
    </div>
  );
};
export default RoomWrapper;
