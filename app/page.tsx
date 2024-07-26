"use client";
import React, { useEffect, useState } from "react";
import Card from "./components/Card/index";
import { supabase } from "./lib/helper/supabaseClient";

export default function Home() {
    const [politicianData, setPoliticianData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from("candidates")
                    .select()
                    .order("id", { ascending: true });

                if (error) {
                    throw new Error(error.message);
                }

                setPoliticianData(data);
            } catch (error) {
                console.error("Error fetching politician data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="py-16 flex flex-col items-center justify-center gap-y-8">
            <h1 className="text-2xl font-semibold">Voting Dashboard</h1>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {politicianData.map((politician: any) => (
                    <Card key={politician.id} name={politician.name} />
                ))}
            </div>
        </main>
    );
}
