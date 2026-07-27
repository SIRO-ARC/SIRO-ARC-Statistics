import fs from "fs";

const inputFile = "./src/assets/pdf/watermark.png";
const outputFile = "./src/assets/pdf/watermarkBase64.js";

const buffer = fs.readFileSync(inputFile);
const base64 = buffer.toString("base64");

const content = `const watermarkBase64 = "data:image/png;base64,${base64}";

export default watermarkBase64;
`;

fs.writeFileSync(outputFile, content);

console.log("✅ watermarkBase64.js wurde erstellt.");