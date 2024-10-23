import { useCallback, useState, useEffect } from "react";
import {
	ReactFlow,
	ReactFlowProvider,
	applyNodeChanges as applyNodeChangesFlow,
	applyEdgeChanges as applyEdgeChangesFlow,
	addEdge as addEdgeFlow,
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
} from "../../../components/store";
import ConditionNode from "../../../components/ConditionNode";
import DefaultNode from "../../../components/DefaultNode";
import EndNode from "../../../components/EndNode";
import StartNode from "../../../components/StartNode";
import CustomEdge from "../../../components/customEdge";
import "../../../components/flow.css";
import { Circle, Diamond, RectangleEllipsis, Squircle } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import TextDisplay from "../../../components/ShowText";
import { useLocation, useParams } from "react-router-dom";

const nodeTypes = {
	conditionNode: (props) => (
		<ConditionNode {...props} divId={useParams().divId} />
	),
	defaultNode: (props) => <DefaultNode {...props} divId={useParams().divId} />,
	endNode: (props) => <EndNode {...props} divId={useParams().divId} />,
	startNode: (props) => <StartNode {...props} divId={useParams().divId} />,
};

const edgeTypes = {
	custom: (props) => <CustomEdge {...props} divId={useParams().divId} />,
};

const NewFlowComponent = () => {
	const location = useLocation();
	const { divId } = useParams();
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);

	const nodes = useSelector((state) => state.nodes.nodes[divId] || []);
	const edges = useSelector((state) => state.nodes.edges[divId] || []);
	const nodeTexts = useSelector((state) => state.nodes.nodeTexts[divId] || {});

	const onNodesChange = useCallback(
		(changes) => {
			dispatch(applyNodeChanges({ changes, divId }));
		},
		[dispatch, divId],
	);

	const onEdgesChange = useCallback(
		(changes) => {
			dispatch(applyEdgeChanges({ changes, divId }));
		},
		[dispatch, divId],
	);

	const onConnect = useCallback(
		(params) => {
			const newEdge = {
				...params,
				type: "custom",
				data: { label: "" },
			};

			dispatch(addEdge({ newEdge, divId }));
			dispatch(updateEdgeLabel({ id: newEdge.id, label: "", divId }));
		},
		[dispatch, divId],
	);

	const addNode = (type) => {
		const newNode = {
			id: `${type}-${nodes.length + 1}`,
			type,
			data: { label: "" },
			position: { x: Math.random() * 1000, y: Math.random() * 1000 },
		};

		dispatch(addNodeAction({ newNode, divId }));
	};

	const handleNodeTextChange = (id, text) => {
		dispatch(updateNodeText({ id, text, divId }));
	};

	const handleEdgeLabelChange = (id, label) => {
		dispatch(updateEdgeLabel({ id, label, divId }));
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
						{showModal && (
							<TextDisplay divId={divId} onClose={() => setShowModal(false)} />
						)}
						<Controls />
						<Background />
						<MiniMap />
					</ReactFlow>
				</div>
			</ReactFlowProvider>
		</>
	);
};

export default NewFlowComponent;
