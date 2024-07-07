#!/usr/bin/env node
import getFileWithAsync from "./index.js"
import fs from 'fs'
import chalk from "chalk"
import validatedList from "./http-validate.js"

const path = process.argv

async function printList(valid, result, id = ''){
    if(valid){
        console.log(
            chalk.yellow('Lista validada'), 
            chalk.black.bgGreen(id),
            await validatedList(result)
        )
    }else{
        console.log(
            chalk.yellow('lista de links'), 
            chalk.black.bgGreen(id),
            result
        )
    }

}

async function wordProcessing(arg){
    const path = arg[2]
    const valid = arg[3] === '--valid'

    try {
        fs.lstatSync(path)
    } catch (error) {
        if (error.code === 'ENOENT'){
            console.log("Arquivo ou diretório não existe")
            return
        }
    }

    if (fs.lstatSync(path).isFile()) {
        const result = await getFileWithAsync(arg[2])
        printList(valid, result)
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path)
        files.forEach( async (fileName) => {
            const list = await getFileWithAsync(`${path}/${fileName}`)
            printList(valid, list, fileName)
        })
    }    
}

wordProcessing(path)
