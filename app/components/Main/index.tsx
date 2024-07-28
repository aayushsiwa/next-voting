import React from "react";
import Card from "../Card/index";

function Main({ politicianData }: { politicianData: any[] }) {
    return (
        <div className="flex flex-wrap justify-center items-center gap-4">
            {politicianData.map((politician) => (
                <Card key={politician.id} name={politician.name} />
            ))}
        </div>
    );
}

export default Main;