import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDoc";
import "./ShowText.css";
import { X } from "lucide-react";

function TextDisplay({ divId, onClose }) {
	const nodes = useSelector((state) => state.nodes.nodes[divId] || []);
	const edges = useSelector((state) => state.nodes.edges[divId] || []);

	const [pseudocode, setPseudocode] = useState("");

	useEffect(() => {
		const storedPseudocode = localStorage.getItem(`pseudocode-${divId}`);
		if (storedPseudocode) {
			setPseudocode(storedPseudocode);
		}
	}, [divId]);

	const generatePseudocode = () => {
		let text = "";
		const processedNodes = new Set();

		nodes.forEach((node) => {
			if (!processedNodes.has(node.id)) {
				processedNodes.add(node.id);
				const nodeText = node.data.label || "";
				const connectedEdges = edges.filter((edge) => edge.source === node.id);

				let edgeText = connectedEdges
					.map((edge) => edge.data?.label)
					.join(", ");

				switch (node.type) {
					case "startNode":
						text += `Start:\n\t${nodeText}\n`;
						if (edgeText) text += `\tEdge: ${edgeText}\n`;
						break;
					case "conditionNode":
						text += `Condition:\t${nodeText}\n`;
						if (edgeText) text += `\tEdge: ${edgeText}\n`;
						break;
					case "defaultNode":
						text += `Default:\t${nodeText}\n`;
						if (edgeText) text += `\tEdge: ${edgeText}\n`;
						break;
					case "endNode":
						text += `End:\t${nodeText}\n`;
						if (edgeText) text += `\tEdge: ${edgeText}\n`;
						break;
					default:
						break;
				}
			}
		});

		console.log("Generated pseudocode:", text);
		setPseudocode(text);
		localStorage.setItem(`pseudocode-${divId}`, text);
	};

	return (
		<>
			<div
				className=" bg-gray-100 absolute top-0 right-0 p-6 flex flex-col justify-start items-center h-full w-[360px]"
				style={{ zIndex: "1000" }}
			>
				<button
					onClick={onClose}
					type="button"
					className="absolute top-2 right-2 border-2 border-[#FF1947] rounded-md "
				>
					<X />
				</button>
				<div>
					<div className="btns mb-3 flex justify-start items-center gap-2">
						<button
							type="button"
							onClick={generatePseudocode}
							className="btn border-2 border-[#FF1947] rounded-md w-28 h-8 font-semibold text-[#FF1947] hover:bg-[#FF1947] hover:text-[#FFF] transition shadow-md"
						>
							Generate
						</button>
						<button
							type="button"
							className="border-2 border-[#FF1947] rounded-md w-28 h-8 font-semibold text-[#FFF] bg-[#FF1947] hover:text-[#FF1947] hover:bg-transparent transition shadow-md"
						>
							<PDFDownloadLink
								document={<PDFDocument pseudocode={pseudocode} />}
								fileName="pseudocode.pdf"
							>
								{({ loading }) => (loading ? "Loading ..." : "Download")}
							</PDFDownloadLink>
						</button>
					</div>
					<h1 className="text-xl font-bold mb-3">Pseudocode:</h1>

					<pre>{pseudocode}</pre>
				</div>
			</div>
		</>
	);
}

export default TextDisplay;
