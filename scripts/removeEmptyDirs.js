import fs from "node:fs";
import path from "node:path";

function removeEmptyDirs(dir) {
	const files = fs.readdirSync(dir);
	if (!files.length) return fs.rmdirSync(dir);

	for (const file of files) {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			removeEmptyDirs(fullPath);
		}
	}

	// Depois de limpar subpastas, tenta remover se ficou vazia
	if (fs.readdirSync(dir).length === 0) {
		fs.rmdirSync(dir);
	}
}

removeEmptyDirs("dist");
