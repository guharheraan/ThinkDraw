import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		padding: 30,
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	text: {
		marginBottom: 10,
	},
	indentedText: {
		marginLeft: 20,
	},
});

const PDFDocument = ({ pseudocode }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				{pseudocode.split("\n").map((line, index) => (
					<Text
						key={index}
						style={line.startsWith("\t") ? styles.indentedText : styles.text}
					>
						{line}
					</Text>
				))}
			</View>
		</Page>
	</Document>
);

export default PDFDocument;
