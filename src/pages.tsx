import {LandingPage} from "./components/pages/Landing";
import * as elements from "typed-html";
import {getPublications} from "./publicationFactory";

export { PageConfig, getPages};

interface PageConfig {
    route: string;
    title: string;
    subPages?: PageConfig[];
    content: any | Promise<any>;
}


const startPages: PageConfig[] = [
    { route: "/", title:  "Wicked Solutions", content: <LandingPage /> },
];

const getPages = (createStatic: boolean = false) => {
    const publications = getPublications(createStatic);
    let pages = startPages;
    publications.forEach((publication) => {
        pages.push({
            route: "/" + publication.number,
            title: publication.title,
            content: publication.element
        })
    });

    if (createStatic) {
        pages = pages.map((page) => {
            if (page.route === "/") {
                return {
                    ...page,
                    route: "index.html"
                }
            }
            const oldRoute = page.route.slice(1)
            return {
                ...page,
                route: oldRoute + ".html"
            }
        })
    }
    return pages;
}





