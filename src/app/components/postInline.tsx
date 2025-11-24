import Breakline from "./breakline";

type props = {
    postText: string;
}

export default function PostInLine({postText}: props) {
    return (
        <div className="postInLine-container">
            <p>{postText}</p>
            <Breakline></Breakline>
            <div className="right-container">
                <div className="like-container">
                    <button>Like</button>
                    <button>Remove Like</button>
                </div>
            </div>
        </div>
    )
}