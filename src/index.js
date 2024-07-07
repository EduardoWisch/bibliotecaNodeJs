import fs from 'fs';
import chalk from 'chalk';

function extractLinks(text){
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const catches = [...text.matchAll(regex)]
  const results = catches.map(catches => ({[catches[1]]: catches[2]}))
  return results.length !== 0 ? results : 'não há links no arquivo' 
}

function handleError(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, 'não há arquivo no diretório'));
}

// async/await

async function getFileWithAsync(filePath) {
  try {
    const encoding = 'utf-8';
    const text = await fs.promises.readFile(filePath, encoding)
    return extractLinks(text)
  } catch (error) {
    handleError(error)
  }
}


// promises com then()

function getFileWithThen(filePath) {
  const encoding = 'utf-8';
  fs.promises
    .readFile(filePath, encoding)
    .then((text) => console.log(chalk.green(text)))
    .catch(handleError)
}

export default getFileWithAsync