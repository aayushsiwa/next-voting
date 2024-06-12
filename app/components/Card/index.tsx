"use client";

import React, { useState, useEffect } from "react";
import politicianData from "../../data.json";

interface CardProps {
    name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPoliticianImage = async () => {
            try {
                const response = await fetch(
                    `/api/politician-image?name=${name}`
                );
                const data = await response.json();
                setImageUrl(data.imageUrl);
            } catch (error) {
                console.error("Error fetching politician image:", error);
            }
        };

        fetchPoliticianImage();
    }, [name]);
    const politician = politicianData.find(
        (politician) => politician.name === name
    );
    const intro = politician?.intro || "";
    const img = politician?.img;
    const votes = politician?.votes;
    // Split the intro text by newline characters and select the first four lines
    const introLines = intro.split(" ").slice(0, 15).join(" ");
    // const slug = name.toLowerCase().split(" ").join("-");
    const placeholderImageUrl = `https://via.placeholder.com/150?text=${name}`;

    return (
        <div className="border-white border-2 min-w-96 max-w-[30%] rounded-lg overflow-hidden">
            <div className="card-header flex justify-between pt-2">
                <h2 className="text-2xl font-semibold text-start ms-4">
                    {name}
                </h2>
            </div>
            <div className="card-body flex gap-1 m-2 items-center">
                <img
                    src={imageUrl || placeholderImageUrl}
                    alt=""
                    className="w-1/4 aspect-square object-cover border-2 border-blue-500 p-1 rounded-full"
                />
                <p className="text-gray-600">
                    {introLines}
                    <a href={name} className="text-xs text-white">
                        ...Read More
                    </a>
                </p>
            </div>
            <button className="bg-slate-800 w-full rounded-sm p-2 hover:bg-slate-700">
                Vote
            </button>
        </div>
    );
};

export default Card;
