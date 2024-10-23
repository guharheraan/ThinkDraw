import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { LogOut, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addDivToUser } from "../../../components/userSlice";

const ProfileSide = () => {
	const { logout, user } = useKindeAuth();
	const dispatch = useDispatch();

	const getRandomImage = () => {
		const imageCount = 37;
		const randomIndex = Math.floor(Math.random() * imageCount) + 1;
		return `../public/placeholders/${randomIndex}.svg`;
	};

	const handleAddDiv = () => {
		const newDiv = {
			id: `div-${Date.now()}`,
			imgSrc: getRandomImage(),
		};
		dispatch(addDivToUser({ userId: user?.id, div: newDiv }));
	};

	return (
		<div className="bg-gray-100 h-screen w-[80px] flex flex-col justify-between items-center px-1 py-2">
			<div className="flex flex-col justify-center items-center gap-2">
				<div className="bg-white border w-[50px] h-[50px] rounded-md shadow-md p-1">
					<img
						src={user?.picture || "../public/logo.png"}
						alt="userimg"
						className="rounded-full"
					/>
				</div>

				<button
					type="button"
					onClick={handleAddDiv}
					className="w-[50px] h-[50px] bg-white border rounded-md shadow-md flex justify-center items-center cursor-pointer"
				>
					<Plus />
				</button>
			</div>

			<button
				onClick={logout}
				type="button"
				className="h-[50px] w-[50px] border bg-white rounded-md shadow-md flex justify-center items-center"
			>
				<LogOut />
			</button>
		</div>
	);
};

export default ProfileSide;
