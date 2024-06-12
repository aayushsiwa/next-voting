import React from "react";
import Card from "./components/Card/index";
import data from "./data.json";

export default function Home() {
    const politicianData = data;
    return (
        <main className="pt-16 flex flex-col items-center justify-center gap-y-8">
            <h1 className="text-2xl font-semibold">Voting Dashboard</h1>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {politicianData.map((politician) => (
                    <Card
                        name={politician.name}
                    />
                ))}
            </div>
        </main>
    );
}
