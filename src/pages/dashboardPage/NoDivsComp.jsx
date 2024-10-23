const NoDivsComp = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-2">
			<img
				src="../public/nodivs.jfif"
				alt="no divs img"
				className=" w-[100%] h-[80%] opacity-75"
			/>
			<h2 className="text-2xl font-bold">Currently you have no boards!</h2>
			<p className="text-lg font-semibold opacity-80">
				Create your first board by clicking the Plus button.
			</p>
		</div>
	);
};

export default NoDivsComp;
