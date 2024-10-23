import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useSelector, useDispatch } from "react-redux";
import { removeDivFromUser, addUser } from "../../components/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProfileSide from "./dashComponents/ProfileSide";
import { Trash2 } from "lucide-react";
import NoDivsComp from "./NoDivsComp";

const DashboardPage = () => {
	const { user } = useKindeAuth();
	const users = useSelector((state) => state.user.users);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
			const currentUser = storedUsers.find((u) => u.id === user.id);
			if (currentUser) {
				dispatch(addUser({ user: currentUser, divs: currentUser.divs }));
			} else {
				dispatch(addUser({ user, divs: [] }));
			}
		}
	}, [user, dispatch]);

	const handleRemoveDiv = (id) => {
		dispatch(removeDivFromUser({ userId: user?.id, id }));
	};

	const handleShowFlow = (id) => {
		const div = currentUser?.divs.find((div) => div.id === id);
		if (div) {
			navigate(`/dashboard/${id}`, {
				state: {
					nodes: div.flowComponent.nodes,
					edges: div.flowComponent.edges,
				},
			});
		}
	};

	const currentUser = users.find((u) => u.id === user?.id);

	const divs = currentUser?.divs || [];

	return (
		<div className="flex">
			<ProfileSide />
			<div className="w-full max-h-screen">
				<div className="flex flex-wrap justify-around items-center bg-gray-100">
					<h1 className="text-2xl font-bold capitalize">
						welcome {user?.given_name} {user?.family_name}
					</h1>
					<div className="flex justify-center items-center gap-2 m-2">
						<input
							type="text"
							className="border-2 border-black rounded-md w-48 px-2 text-[#FF1947]"
						/>
						<button
							type="button"
							className="border-2 border-black px-2 rounded-md bg-black text-white hover:bg-transparent hover:text-black transition"
						>
							Search
						</button>
					</div>
				</div>
				<main className=" flex flex-wrap justify-start items-start gap-2 w-[99%] h-[90%] my-4 mx-2 overflow-auto rounded-md p-2 border border-gray-200">
					{divs.length > 0 ? (
						divs.map((div) => (
							<div
								key={div.id}
								className="w-40 h-48 border bg-gray-100 rounded-md"
							>
								<button
									onClick={() => handleShowFlow(div.id)}
									type="button"
									className="w-full h-[80%] cursor-pointer border-b border-gray-200"
								>
									<img
										src={div.imgSrc}
										alt="placeholder"
										className="center p-1 w-full h-full"
									/>
								</button>
								<div className="flex justify-between items-center px-2">
									<div className="text-xs">
										<p>untitled</p>
										<p>{user?.given_name || "Unknown User"}</p>
									</div>
									<button type="button" onClick={() => handleRemoveDiv(div.id)}>
										<Trash2 />
									</button>
								</div>
							</div>
						))
					) : (
						<div className="flex flex-col justify-center items-center w-full h-full">
							<NoDivsComp />
						</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default DashboardPage;
