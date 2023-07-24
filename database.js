const Books = [
    {
    ISBN : "1125JEK",
    title: "Space Rockets",
    pubDate: "11-04-2009",
    language: "en",
    numPages: 250,
    authors: [1,2],
    publications: [1],
    category: ["tech","space","education"]
},
{
    ISBN : "1130IDE",
    title: "Not all Heroes Wear Capes",
    pubDate: "24-11-2020",
    language: "en",
    numPages: 100,
    authors: [2,3],
    publications: [1],
    category: ["music","adventure","education"]
}
]

const Authors = [
    {
        id: 1,
        name: "John Evans",
        books: ["1125JEK"]
    },
    {
        id: 2,
        name: "Benjamin Powell",
        books: ["1125JEK", "1130IDE"]
    },
    {
        id: 3,
        name: "Carmelo Anthony",
        books: ["1130IDE"]
    }
]

const Publications = [
    {
        id: 1,
        title: "PNC Publications",
        books: ["1125JEK", "1130IDE"]
    }
]

module.exports = { Books, Authors, Publications }