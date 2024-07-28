"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "./lib/helper/supabaseClient";
import Main from "./components/Main/index";

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
        <main className="pb-16 pt-4 flex flex-col items-center justify-center gap-y-8">
            <h1 className="text-5xl font-semibold">Voting Dashboard</h1>
            <Main politicianData={politicianData} />
        </main>
    );
}
