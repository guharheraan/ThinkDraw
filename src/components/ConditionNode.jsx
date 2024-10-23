import { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { removeNode, updateNodeText } from "./store";
import "./conditionNode.css";
import { Trash2 } from "lucide-react";

const ConditionNode = ({ id, data, isConnectable, selected, divId }) => {
	const dispatch = useDispatch();
	const nodeTexts = useSelector((state) => state.nodes.nodeTexts[divId] || {});
	const [text, setText] = useState(nodeTexts[id] || data.label || "");

	useEffect(() => {
		setText(nodeTexts[id] || data.label || "");
	}, [nodeTexts, data.label, id]);

	const onChange = useCallback(
		(evt) => {
			const newText = evt.target.value;
			setText(newText);
			dispatch(updateNodeText({ id, text: newText, divId }));
		},
		[dispatch, id, divId],
	);

	const handleDelete = useCallback(() => {
		dispatch(removeNode({ id, divId }));
	}, [dispatch, id, divId]);

	return (
		<div className="conditionNode">
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
				style={{ left: 0, top: 0 }}
			/>
			<Handle
				type="source"
				position={Position.Left}
				isConnectable={isConnectable}
				style={{ left: 0, top: 93 }}
			/>
			<div>
				<input
					id="text"
					name="text"
					value={text}
					onChange={onChange}
					className=""
				/>
			</div>
			{selected && (
				<button type="button" onClick={handleDelete}>
					<Trash2 />
				</button>
			)}
			<Handle
				type="source"
				position={Position.Right}
				id="b"
				isConnectable={isConnectable}
				style={{ left: 88, top: 0 }}
			/>
		</div>
	);
};

export default ConditionNode;
