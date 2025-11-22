
type props = {
    postText: string;
}

export default function PostInLine({postText}: props) {
    return (
        <div>
            <p>{postText}</p>
        </div>
    )
}