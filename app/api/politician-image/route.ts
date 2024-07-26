import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // console.log(req); // Logging the request object
    // const { name } = req?.url; // Retrieving the "name" query parameter
    // console.log("Name parameter:", req.url); // Logging the "name" parameter
    const name = req.url.split("=")[1];
    const formattedName = name.split(" ").join("_");
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${formattedName}&formatversion=2&pithumbsize=250`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch politician image: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        const pages = data.query.pages;

        // Check if there are no pages or the response structure is unexpected
        if (!pages || Object.keys(pages).length === 0) {
            throw new Error("No pages found in the Wikipedia API response");
        }

        // Get the first page ID
        const pageId = Object.keys(pages)[0];

        // Check if the page has a thumbnail
        if (!pages[pageId].thumbnail || !pages[pageId].thumbnail.source) {
            throw new Error("No thumbnail found for the politician");
        }

        const imageUrl = pages[pageId].thumbnail.source;
        // console.log(imageUrl);
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error("Error fetching politician image:", error);
        return NextResponse.json({ error: "Failed to fetch politician image" });
    }
    // return NextResponse.json({ message: `Hello, ${name || "World"}!` });
}
