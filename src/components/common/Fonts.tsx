import * as elements from "typed-html";

export { StevieSamsBold}

const StevieSamsBold = ({isStatic=false}: {isStatic:boolean}) => {
    const path = isStatic ? "fonts/StevieSansBold.otf" : "public/fonts/StevieSansBold.otf";
    return (
        <style>
        {`        
        @font-face {
        font-family: 'StevieSansBold';
        src: url(${path}) format('opentype');
        font-weight: 200;
        font-style: normal;
        }`
        }
    </style>
)
};