import chalk from "chalk"

function extractLinks(linksArray){
    return linksArray.map((linkObject) => Object.values(linkObject).join())
}

async function checkStatus(listURLs){
    const statusArray = await Promise.all(
        listURLs.map( async (url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (error) {
                return handleErrors(error)
            }
        })
    )
    return statusArray
}

function handleErrors(error){
  if (error.cause.code === 'ENOTFOUND'){
    return "link não encontrado"
  } else {
    return 'ocorreu algum erro'
  }
}

export default async function validatedList(linksList){
    const links = extractLinks(linksList)
    const status = await checkStatus(links)
    return linksList.map((object, index) => ({
        ...object, 
        status: status[index]
    }))
}