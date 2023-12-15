import Link from "next/link";
import { usePathname } from "next/navigation";
import { TfiClose } from "react-icons/tfi";

const MobileHeader = ({ open, close }: any) => {

  const path = usePathname()
  return (
    <>
      <div className={`${open? `block`:`hidden`} fixed bg-slate-200 inset-0 z-10 opacity-50 md:hidden flex`} onClick={close}></div>
      <div className={`${open ? `translate-x-0` : `-translate-x-full`} fixed z-20 flex flex-col md:hidden bg-slate-500 top-0 bottom-0 left-0 w-2/3 items-end duration-700 p-5`}>
        <button className={`${open ? `rotate-0 ` : `rotate-180 `} hover:rotate-90 duration-700 w-8 h-8 text-white flex justify-end mb-2.5`} onClick={close}><TfiClose className="w-full h-full" /></button>
          <Link href={"/home"} className={`${path === "/home"?`bg-slate-200`: `bg-black text-white`} nav-mobile`} >Home</Link>
          <Link href={"/room"} className={`${path === "/room"?`bg-slate-200`: `bg-black text-white`} nav-mobile`} >Room</Link>
          <Link href={"/received"} className={`${path === "/received"?`bg-slate-200`: `bg-black text-white`} nav-mobile`} >received</Link>
          <Link href={"/confirmation"} className={`${path === "/confirmation"?`bg-slate-200`: `bg-black text-white`} nav-mobile`} >Confirmation</Link>
          <Link href={"/detailroom"} className={`${path === "/detailroom"?`bg-slate-200`: `bg-black text-white`} nav-mobile`} >Detailroom</Link>
      </div>
    </>
  );
};
export default MobileHeader;
