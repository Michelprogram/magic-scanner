import {Client} from "@notionhq/client"

const NOTION_TOKEN = ""
const DATABASE_ID = ""

// Initializing a client
const notion = new Client({
  auth: NOTION_TOKEN,
})

const fetchCards = async () =>{

	const res = []
	
	const firstRequest = await notion.databases.query({
	  database_id: DATABASE_ID,
	})

	res.push(...firstRequest.results)
	
	const fetchy = async (request:QueryDatabaseResponse, result: Array) => {
			if (!request.has_more) return result
		
			const fetch = await notion.databases.query({
				database_id: DATABASE_ID,
				start_cursor: request.next_cursor
			})
	
			result.push(...fetch.results)
	
			return fetchy(fetch, result)
		
	}

	return fetchy(firstRequest, res)
	
}

const cards = await fetchCards()

cards.forEach(async(card,index) => {
	const {id,created_time} = card
	const response = await notion.pages.update({
    page_id: id,
    properties: {
      Ajout: {
        date: {
					start: created_time
				},
      },
    },
	})
	console.log(index)
})

console.log(`Cards : ${cards.length}`)
