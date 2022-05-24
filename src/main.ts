#!/usr/bin/env node

import { mkdir, writeFile } from "fs/promises"
import { exit } from "process"

const SRC_FOLDER = "./src/"
const COMPONENTS_FOLDER = SRC_FOLDER + "components/"

function generateComponentTsxTemplate(componentName: string): string {
    return `import React from 'react';
import './${componentName}.css';

function ${componentName}() {
    return (
        <div className="${componentName}">
        </div>
    )
}
`
}

function generateComponentCssTemplate(componentName: string): string {
    return `.${componentName} {

}
`
}

function throwError(message: string) {
    console.error("ERROR:", message)
    exit(1)
}

(async () => {
    if (process.argv.length != 3) throwError("Required name for component")

    var name = process.argv[2]

    try {
        // Create folder for component
        var componentFolder = COMPONENTS_FOLDER + name
        await mkdir(componentFolder, {recursive: true})

        // Create necessary files
        await writeFile(`${componentFolder}/${name}.jsx`, generateComponentTsxTemplate(name))
        await writeFile(`${componentFolder}/${name}.css`, generateComponentCssTemplate(name))
    } catch (error) {
        throwError((error as Error).message)
    }

    // Notify the user
    console.log(`Created ${name} component at ${COMPONENTS_FOLDER + name}`)
})()
