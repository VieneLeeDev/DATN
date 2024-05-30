import { Footer } from "../Footter";
import { Header } from "../Hearder";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col max-w-screen min-h-screen">
      <Header />
      <div className="flex justify-center items-center">{children}</div>
      <Footer />
    </div>
  );
};
export default MainLayout;
