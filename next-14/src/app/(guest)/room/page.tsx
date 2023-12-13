import RoomWrapper from "@/app/components/ui/RoomWrapper/RoomWrapper";

const Room = () => {
  return (
    <div className="flex flex-col container ">
      <h2 className="text-center text-4xl font-bold h-[100px] my-10">List of the Rooms</h2>
      <RoomWrapper />
      <RoomWrapper />
      <RoomWrapper />
    </div>
  );
};
export default Room;
