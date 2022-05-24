#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const process_1 = require("process");
const SRC_FOLDER = "./src/";
const COMPONENTS_FOLDER = SRC_FOLDER + "components/";
function generateComponentTsxTemplate(componentName) {
    return `import React from 'react';
import './${componentName}.css';

function ${componentName}() {
    return (
        <div className="${componentName}">
        </div>
    )
}

export default ${componentName};
`;
}
function generateComponentCssTemplate(componentName) {
    return `.${componentName} {

}
`;
}
function throwError(message) {
    console.error("ERROR:", message);
    process_1.exit(1);
}
(async () => {
    if (process.argv.length != 3)
        throwError("Required name for component");
    var name = process.argv[2];
    try {
        // Create folder for component
        var componentFolder = COMPONENTS_FOLDER + name;
        await promises_1.mkdir(componentFolder, { recursive: true });
        // Create necessary files
        await promises_1.writeFile(`${componentFolder}/${name}.tsx`, generateComponentTsxTemplate(name));
        await promises_1.writeFile(`${componentFolder}/${name}.css`, generateComponentCssTemplate(name));
    }
    catch (error) {
        throwError(error.message);
    }
    // Notify the user
    console.log(`Created ${name} component at ${COMPONENTS_FOLDER + name}`);
})();
