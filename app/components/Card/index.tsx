import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/helper/supabaseClient";

interface CardProps {
    name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
    const [politician, setPolitician] = useState<any | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    var [votes, setVotes] = useState<number>(0);

    useEffect(() => {
        const fetchPoliticianData = async () => {
            try {
                const { data, error } = await supabase
                    .from("candidates")
                    .select()
                    .eq("name", name);

                if (error) {
                    throw new Error(error.message);
                }

                if (data && data.length > 0) {
                    setPolitician(data[0]);
                    setVotes(data[0].votes);
                } else {
                    throw new Error("Politician data not found");
                }
            } catch (error: any) {
                setError(error.message);
            }
        };

        const fetchPoliticianImage = async () => {
            try {
                const response = await fetch(
                    `/api/politician-image?name=${name}`
                );
                const data = await response.json();
                setImageUrl(data.imageUrl);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching politician image:", error);
                setError("Error fetching politician image");
            }
        };

        fetchPoliticianData();
        fetchPoliticianImage();
    }, [name]);

    const handleVote = async () => {
        if (votes === undefined) {
            // Handle the case where votes is undefined
            return;
        }
        // console.log("Voting for", name, votes);
        votes = votes + 1;
        setVotes(votes);
        // console.log("Voted for", name, votes);
        const { data, error } = await supabase
            .from("candidates")
            .update({ votes: votes })
            .eq("name", name)
            .select();
        // console.log(data);
    };

    const intro = politician?.introduction || "";
    const introLines = intro.split(" ").slice(0, 15).join(" ");
    const placeholderImageUrl = `https://via.placeholder.com/150?text=${name}`;

    return (
        <div className="border-white border-2 min-w-96 max-w-[30%] rounded-lg overflow-hidden h-60 flex flex-col justify-between">
            <div className="card-header flex justify-between pt-2">
                <h2 className="text-2xl font-semibold text-start ms-4">
                    {name}
                </h2>
                <div className="flex justify-center items-center text-2xl font-semibold me-4 border-2 border-lime-600 rounded-full overflow-clip">
                    <p className="px-4 pt-0 pb-0 mt-0 mb-0">{votes}</p>
                </div>
            </div>

            <div className="card-body flex gap-1 m-2 items-center">
                <div className="border-2 border-blue-500 rounded-full w- overflow-hidden">
                    {loading ? (
                        <img
                            src={placeholderImageUrl}
                            alt=""
                            className="aspect-square object-cover p-1 rounded-full img-loading"
                        />
                    ) : (
                        <img
                            src={imageUrl || placeholderImageUrl}
                            alt=""
                            className="aspect-square object-cover p-1 rounded-full"
                        />
                    )}
                </div>
                <p className="text-gray-600">
                    {introLines}
                    <a href={name} className="text-xs text-white">
                        ...Read More
                    </a>
                </p>
            </div>
            <button
                className="bg-slate-800 w-full rounded-sm p-2 hover:bg-slate-700 active:bg-slate-950"
                onClick={handleVote}
            >
                Vote
            </button>
        </div>
    );
};

export default Card;
