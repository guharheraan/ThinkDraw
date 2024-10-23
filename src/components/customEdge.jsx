import { useState, memo } from "react";
import { getBezierPath } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { updateEdgeLabel, removeEdge } from "./store";

const CustomEdge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	data,
	selected,
	divId,
}) => {
	const dispatch = useDispatch();
	const [editableLabel, setEditableLabel] = useState(data.label || "");

	const handleLabelChange = (e) => {
		const label = e.target.value;
		setEditableLabel(label);
		dispatch(updateEdgeLabel({ id, label, divId }));
	};

	const handleEdgeDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(removeEdge({ id, divId }));
	};

	const [edgePath] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	return (
		<>
			<path id={id} className="react-flow__edge-path" d={edgePath} />
			<foreignObject
				width={100}
				height={60}
				x={(sourceX + targetX) / 2 - 50}
				y={(sourceY + targetY) / 2 - 40}
			>
				<div
					className="wrapper"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "4px",
					}}
				>
					{selected && (
						<button
							className="edgeBtn"
							type="button"
							onClick={handleEdgeDelete}
							style={{
								marginBottom: "5px",
								padding: "2px 5px",
								fontSize: "12px",
								border: "none",
								color: "#FF1947",
								cursor: "pointer",
								background: "#f0f0f0",
								borderRadius: "50px",
								zIndex: 10,
							}}
						>
							Delete
						</button>
					)}
					<input
						className="edgeInput"
						value={editableLabel}
						onChange={handleLabelChange}
						style={{
							width: "60px",
							height: "20px",
							fontSize: "12px",
							textAlign: "center",
							border: "none",
							background: "#f0f0f0",
							borderRadius: "5px",
							outline: "none",
						}}
						placeholder="Edit Label"
					/>
				</div>
			</foreignObject>
		</>
	);
};

export default memo(CustomEdge);
