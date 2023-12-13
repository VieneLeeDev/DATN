import Link from "next/link";

interface LinkButtonProps {
  children?: string;
  href: string;
  classCustom?: string;
}
const LinkButton = ({ children, href, classCustom }: LinkButtonProps) => {
  return (
    <Link
      className={`${classCustom? `${classCustom}`:`bg-[#13b0bb] h-[50px] text-white`} flex flex-1 justify-center items-center md:max-h-[50px] border-[1px] text-xl font-sans my-2 rounded-md`}
      href={href}
    >
      {children}
    </Link>
  );
};
export default LinkButton;
