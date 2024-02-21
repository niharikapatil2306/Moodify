import { useState } from "react";

export default function MoodifyPage() {
    const [date, setDate] = useState(new Date());
    return(
        <div>
            <p>
                {date.toDateString()}
            </p>
        </div>
    );
}