import * as elements from "typed-html";
import {HTMX, HYPERSCRIPT, TAILWIND} from "./scripts";
import {Title} from "./layout/Title";
import {StevieSamsBold} from "./common/Fonts";
import {MainContent} from "./common/MainContent";
import {PageConfig} from "../pages";
import {Navbar} from "./layout/Navbar";
import {isMobileOrNarrow} from "./common/Hyperscript";




const authors =
    [
        {
            name: "Pierre-Louis Suckrow",
            email: "suckrowpierre@gmail.com",
            github: "https://github.com/suckrowPierre"
        },
        {
            name: "Daniel D. Hromada",
            email: "dh@udk-berlin.de",
            github: "https://github.com/hromi"
        }
]

const Head = ({title, authors, isStatic=false}: {title: string, authors: any, isStatic:boolean}) => {
    return (
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
            {authors.map((author: any) => `<meta name="author" content="${author.name}">`).join("\n")}
            <HYPERSCRIPT />
            <TAILWIND />
            <StevieSamsBold isStatic={isStatic}/>
        </head>
    )
}


const Body = ({children, pages}: {children: any, pages: PageConfig[]}) => {
    const minScreenWidth = 600;

    return (
        <body class="p-4 h-screen overscroll-none"
              _={isMobileOrNarrow(minScreenWidth)}>
        <Header pages={pages} />
        <MainContent>
            {children}
        </MainContent>
        </body>
    )
}

const Header = ({pages}: {pages: PageConfig[]}) => {
    const title = pages.find(page => (page.route === "/"|| page.route === "index.html")).title
    const titleRoute = pages.find(page => (page.route === "/"|| page.route === "index.html")).route
    return (
    <header class="max-w-[520px]">
        <Title title={title} route= {titleRoute} />
        <Navbar pages={pages} />
    </header>
)}


const BaseHTML = ({children, pages, isStatic=false}: {children: any, pages: PageConfig[], isStatic: boolean}) => {
    const title = pages.find(page => (page.route === "/"|| page.route === "index.html")).title
    return `
<!DOCTYPE html>
<html lang="en">
    ${Head({title, authors, isStatic})}
    ${Body({children, pages})}
</html>
`}

export {BaseHTML}