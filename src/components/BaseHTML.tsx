import * as elements from "typed-html";
import {HTMX, HYPERSCRIPT, TAILWIND} from "./scripts";
import {Title} from "./layout/Title";
import {StevieSamsBold} from "./common/Fonts";
import {MainContent} from "./common/MainContent";
import {PageConfig, pages} from "../pages";
import {Navbar} from "./layout/Navbar";
import {isMobileOrNarrow} from "./common/Hyperscript";



const title = pages.find(page => page.route === "/").title

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

const Head = ({title, authors}: {title: string, authors: any}) => (
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {authors.map((author: any) => `<meta name="author" content="${author.name}">`).join("\n")}
        <HTMX />
        <HYPERSCRIPT />
        <TAILWIND />
        <StevieSamsBold />
    </head>
)


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

const Header = ({pages}: {pages: PageConfig[]}) => (
    <header class="max-w-[520px]">
        <Title title={title} />
        <Navbar pages={pages} />
    </header>
)


const BaseHTML = ({children, pages}: {children: any, pages: PageConfig[]}) => `
<!DOCTYPE html>
<html lang="en">
    ${Head({title, authors})}
    ${Body({children, pages})}
</html>
`

export {BaseHTML}