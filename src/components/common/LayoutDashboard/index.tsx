import HeaderDashboard from "@/components/HeaderDashboard";
// import NavigateDashboard from "@/components/NavigateDashboard";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
	return (<section className="w-full h-full">
		<HeaderDashboard />
		<section className="flex h-[calc(100%_-_50px)] overflow-y-scroll">
			<section className="flex-1 bg-slate-500">
				{children}
			</section>
		</section>
	</section>
	);
};
export default LayoutDashboard;
