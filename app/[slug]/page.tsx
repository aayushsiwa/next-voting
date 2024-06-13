"use client";
import React, { useState, useEffect } from "react";
import politicianData from "../data.json";
import Image from "next/image";
import twitter from "../../public/twitter.svg";
import website from "../../public/website.svg";

interface PageProps {
    params: {
        slug: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | null>(true);
    // Extract slug from params
    const { slug } = params;

    // Replace "%20" with space in the slug
    const name = slug.replace("%20", " ");
    const placeholderImageUrl = `https://via.placeholder.com/150?text=${name}`;

    // Find politician with the matching name
    const politician = politicianData.find(
        (politician) => politician.name === name
    );
    useEffect(() => {
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
            }
        };
        fetchPoliticianImage();
    }, [name]);

    return (
        <>
            <a href="/" className="fixed top-16 left-16">
                {"<--"}
            </a>
            {politician ? (
                <>
                    <div className="flex flex-col justify-center items-center pt-16 px-16 gap-y-8">
                        <div className="flex justify-between items-center gap-8">
                            <div className="border-2 border-blue-500 rounded-full w-72 h-72 overflow-hidden flex">
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
                            <div className="flex flex-col gap-y-8 justify-center items-center">
                                <h1 className="text-3xl font-semibold">
                                    {name}
                                </h1>
                                <div className="flex  gap-16">
                                    <a
                                        href={`https://twitter.com/${politician.twitterHandle}`}
                                    >
                                        <Image
                                            priority
                                            src={twitter}
                                            alt="Follow us on Twitter"
                                            className="w-8"
                                        />
                                    </a>
                                    <a href={politician.website}>
                                        <Image
                                            priority
                                            src={website}
                                            alt="Website"
                                            className="w-8"
                                        />
                                    </a>
                                    <div className="flex justify-center items-center text-2xl font-semibold me-4 border-2 border-lime-600 rounded-full overflow-clip">
                                        <p className="px-4 pt-0 pb-0 mt-0 mb-0">
                                            {politician.votes}
                                        </p>
                                    </div>
                                </div>
                                <ul className="list-disc text-lg ms-4">
                                    {politician.keyPoints.map(
                                        (point, index) => (
                                            <li key={index}>{point}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <p>{politician.introduction}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-center mt-[50vh]">
                        Candidate Not Found
                    </div>
                </>
            )}
        </>
    );
};

export default Page;
