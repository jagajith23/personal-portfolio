import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 },
        );
    }

    const query = `
    query userBadges($username: String!) {
        matchedUser(username: $username) {
            badges {
                id
                name
                shortName
                displayName
                icon
                hoverText
                medal {
                  slug
                  config {
                    iconGif
                    iconGifBackground
                  }
                }
                creationDate
                category
            }
        }
    }
  `;

    try {
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json(
                {
                    error: "LeetCode API error",
                    status: response.status,
                    body: text || null,
                },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to reach LeetCode API" },
            { status: 502 },
        );
    }
}
