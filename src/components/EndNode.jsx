import { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { removeNode, updateNodeText } from "./store";
import "./endNode.css";
import { Trash2 } from "lucide-react";

const EndNode = ({ id, data, isConnectable, selected, divId }) => {
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
		<div className="endNode">
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
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
				position={Position.Bottom}
				id="b"
				isConnectable={isConnectable}
			/>
		</div>
	);
};

export default EndNode;
