import "./Thumbnail.css"

export default function Thumbnail({src}){
    return(
        <div className="thumbnail">
            <img src={src} alt=""/>
        </div>
    )
}