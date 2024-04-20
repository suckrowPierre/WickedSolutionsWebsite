import * as elements from "typed-html";

export {H1, H2Left}

const H1 = ({text}: {text:string}) => (
    <h1 class="text-6xl font-bold" style='font-family: "StevieSansBold"'>{text}</h1>
)

const H2Left = ({text}: {text:string}) => (
    <h2 class="text-4xl font-bold text-left" style='font-family: "StevieSansBold"'>{text}</h2>
)

