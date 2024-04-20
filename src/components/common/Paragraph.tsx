import * as elements from "typed-html";

export {Paragraph, ImageParagraph}

const Paragraph = ({text}: {text:string}) => (
    <p class="text-justify" style="text-align-last: center" >
        {text}
    </p>
)

const ImageParagraph = ({text, style}: {text:string, style?:string}) => {
    const defaultStyle = 'font-family: "StevieSansBold"; font-size: calc(11px + (16 - 11) * ((100vw - 500px) / (1920 - 500)));'
    const extra_style = style ? defaultStyle + "; " + style : ""
    return(
    <p class="absolute px-2 top-0 left-0 text-justify text-white"
       style={extra_style} >
        {text}
    </p>
)}
