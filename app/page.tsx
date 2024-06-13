"use client";
import React, { useEffect, useState } from "react";
import Card from "./components/Card/index";
// import data from "./data.json";
import { supabase } from "./lib/helper/supabaseClient";

export default function Home() {
    const [politicianData, setPoliticianData] = useState<any | any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from("candidates").select();
            console.log(data);
            setPoliticianData(data);
        };
        fetchData();
    }, []); // Add an empty dependency array to useEffect to fetch data only once

    return (
        <main className="pt-16 flex flex-col items-center justify-center gap-y-8">
            <h1 className="text-2xl font-semibold">Voting Dashboard</h1>
            {/* {politicianData} */}
            <div className="flex flex-wrap justify-center items-center gap-4">
                {/* {politicianData} */}
                {politicianData &&
                    politicianData.map((politician: any) => (
                        <Card key={politician.id} name={politician.name} />
                    ))}
            </div>
        </main>
    );
}
