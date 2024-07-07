function extractLinks(linksArray){
    return linksArray.map((linkObject) => Object.values(linkObject).join())
}

async function checkStatus(listURLs){
    const statusArray = await Promise.all(
        listURLs.map( async (url) => {
            const response = await fetch(url)
            return response.status
        })
    )
    return statusArray
}

export default async function validatedList(linksList){
    const links = extractLinks(linksList)
    const status = await checkStatus(links)
    return linksList.map((object, index) => ({
        ...object, 
        status: status[index]
    }))
}