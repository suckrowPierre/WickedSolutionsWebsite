import * as elements from "typed-html";
import {ImageParagraph} from "./Paragraph";
import {resizeOrLoadCheck} from "./Hyperscript";

export {PublicationImageGrid, PublicationData, Author}

interface PublicationData {
    "id": string;
    "pdfPath": string;
    "imagePath": string;
    "title": string;
    "text-align-last": string;
    "emoji"?: string;
}

const getIdentifier = (id: string) => id.slice(0, 20).replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "").toLowerCase()

const titleIdentifier = (id: string) => "title-" + getIdentifier(id)
const authorIdentifier = (id: string) => "author-" + getIdentifier(id)

const TitleOver = (showId) =>  `show #${showId}`
const TitleOut = (showId) =>  `hide #${showId}`

const HighlightAuthorOver = (id?: string) => `add .${authorHighlight} ${id ? "to #" + id : ""}`
const HighlightAuthorOut = (id?: string) => `remove .${authorHighlight} ${id ? "from #" + id : ""}`

const Over = (id: string) => `${TitleOver(titleIdentifier(id))} then ${HighlightAuthorOver(authorIdentifier(id))}`
const Out = (id: string) => `${TitleOut(titleIdentifier(id))} then ${HighlightAuthorOut(authorIdentifier(id))}`

const HoverHTMX = (onHover: string, onOut: string) => `on mouseover if not isMobileOrNarrow() ${onHover} end on mouseout if not isMobileOrNarrow() ${onOut} end`




const authorClasses = `italic cursor-pointer`;
const authorHighlight = "text-blue-600"

const Author = ({author,id}: {author: string, id:string}) => (
    <i class={authorClasses} id={authorIdentifier(id)} _={ HoverHTMX(Over(id), Out(id))}
    >{author}</i>
)

const Emoji = ({emoji}: {emoji: string}) => (
    <span class="absolute bottom-0 right-0 text-l">{emoji}</span>
)


const PublicationImageGrid = ({publications}:{publications: PublicationData[]}) => (
    <div class="grid grid-cols-3 gap-4" _={resizeOrLoadCheck + " if isMobileOrNarrow() remove .grid-cols-3 add .grid-cols-2 else remove .grid-cols-2 add .grid-cols-3"}>
        {publications.map((publication: PublicationData) => (
            <a href={publication.pdfPath} target="_blank" class="relative h-full w-full" _={ HoverHTMX(Over(publication.id), Out(publication.id))}>
                <img src={publication.imagePath} />
                {publication.emoji ? <Emoji emoji={publication.emoji}/> : null}
                <div id={titleIdentifier(publication.id)} style="display:none" _={resizeOrLoadCheck + " if isMobileOrNarrow() show else hide"}>
                    <ImageParagraph text={publication.title} style={"text-align-last: " + publication["text-align-last"]}/>
                </div>
            </a>
        ))}
    </div>
)