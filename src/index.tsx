import './index.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");
if (container) {
	const root = createRoot(container);
	root.render(<App />);
} else {
	// fallback for non-browser environments
	console.warn('Root container not found');
}