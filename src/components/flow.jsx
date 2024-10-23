import { useCallback, useState } from "react";
import {
	ReactFlow,
	ReactFlowProvider,
	addEdge as addEdgeFlow,
	applyNodeChanges as applyNodeChangesFlow,
	applyEdgeChanges as applyEdgeChangesFlow,
	Controls,
	Background,
	MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
	updateNodeText,
	updateEdgeLabel,
	removeNode,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	addNode as addNodeAction,
} from "./store";
import ConditionNode from "./ConditionNode";
import DefaultNode from "./DefaultNode";
import EndNode from "./EndNode";
import StartNode from "./StartNode";
import CustomEdge from "./customEdge";
import "./flow.css";
import { Circle, Diamond, RectangleEllipsis, Squircle } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import TextDisplay from "./ShowText";

const nodeTypes = {
	conditionNode: ConditionNode,
	defaultNode: DefaultNode,
	endNode: EndNode,
	startNode: StartNode,
};

const edgeTypes = {
	custom: CustomEdge,
};

const FlowComponent = () => {
	const dispatch = useDispatch();
	const nodes = useSelector((state) => state.nodes.nodes);
	const edges = useSelector((state) => state.nodes.edges);
	const [showModal, setShowModal] = useState(false);

	const onNodesChange = useCallback(
		(changes) => {
			dispatch(applyNodeChanges(changes));
		},
		[dispatch],
	);

	const onEdgesChange = useCallback(
		(changes) => {
			dispatch(applyEdgeChanges(changes));
		},
		[dispatch],
	);

	const onConnect = useCallback(
		(params) => {
			const newEdge = {
				...params,
				type: "custom",
				data: { label: "" },
			};
			dispatch(addEdge(newEdge));
			dispatch(updateEdgeLabel({ id: newEdge.id, label: "" }));
		},
		[dispatch],
	);

	const addNode = (type) => {
		const newNode = {
			id: `${type}-${nodes.length + 1}`,
			type,
			data: { label: "" },
			position: { x: Math.random() * 1000, y: Math.random() * 1000 },
		};
		dispatch(addNodeAction(newNode));
	};

	const handleNodeDelete = (id) => {
		dispatch(removeNode({ id }));
	};

	const { logout } = useKindeAuth();

	return (
		<>
			<ReactFlowProvider>
				<div style={{ height: "100vh" }}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						nodeTypes={nodeTypes}
						edgeTypes={edgeTypes}
						fitView
					>
						<div
							className="buttons"
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
								alignItems: "center",
								marginBottom: "20px",
								position: "fixed",
								zIndex: "1000",
								left: "3%",
								top: "50%",
								transform: "translate(-50%, -50%)",
								gap: "1rem",
								background: "white",
								boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
								height: "10rem",
								width: "2.5rem",
								borderRadius: "10px",
							}}
						>
							<button type="button" onClick={() => addNode("startNode")}>
								<Circle />
							</button>
							<button type="button" onClick={() => addNode("conditionNode")}>
								<Diamond />
							</button>
							<button type="button" onClick={() => addNode("defaultNode")}>
								<RectangleEllipsis />
							</button>
							<button type="button" onClick={() => addNode("endNode")}>
								<Squircle />
							</button>
						</div>
						<div
							className="absolute right-10 top-2 flex justify-center items-center gap-4"
							style={{ zIndex: "1000" }}
						>
							<button
								onClick={() => setShowModal(true)}
								type="button"
								className="border-2 border-black font-semibold rounded-md text-white bg-black p-1 cursor-pointer hover:bg-transparent hover:text-black "
							>
								View Pseudocode
							</button>
							<button
								type="button"
								onClick={logout}
								style={{ zIndex: "1000" }}
								className="border-2 border-[#FF1947] font-semibold  rounded-md p-1 bg-[#FF1947] text-white cursor-pointer hover:bg-white hover:text-[#FF1947] logout"
							>
								Logout
							</button>
						</div>
						{showModal && <TextDisplay onClose={() => setShowModal(false)} />}
						<Controls />
						<Background />
						<MiniMap />
					</ReactFlow>
				</div>
			</ReactFlowProvider>
		</>
	);
};

export default FlowComponent;
