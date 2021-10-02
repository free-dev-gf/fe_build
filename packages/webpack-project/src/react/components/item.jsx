import React, {useState} from "react";
import { hot } from "react-hot-loader/root";

function Item() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>{count}</div>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                add
            </button>
        </>
    );
}

export default hot(Item);
