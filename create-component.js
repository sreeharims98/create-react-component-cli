#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get component name from command line argument
const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name!");
  console.error("Usage: create-component <component-name>");
  process.exit(1);
}

// Create directory if it doesn't exist
const componentDir = path.join(process.cwd(), componentName);
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir);
}

// Create TSX file content
const tsxContent = `import React from 'react';
import styles from './${componentName}.module.scss';

interface ${componentName}Props {
  // Define your props here
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <div className={styles.${componentName}}>
      <h1>${componentName} Component</h1>
    </div>
  );
};

export default ${componentName};
`;

// Create SCSS module content
const scssContent = `.${componentName} {
  // Your styles here
}
`;

// Write files
fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), tsxContent);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.module.scss`),
  scssContent
);

console.log(`Component ${componentName} created successfully!`);
