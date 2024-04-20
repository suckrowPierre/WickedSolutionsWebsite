import {LandingPage} from "./components/pages/Landing";
import * as elements from "typed-html";
import {getPublications} from "./publicationFactory";

export { PageConfig, pages};

interface PageConfig {
    route: string;
    title: string;
    subPages?: PageConfig[];
    content: any | Promise<any>;
}

const publications = getPublications();

const startPages: PageConfig[] = [
    { route: "/", title:  "Wicked Solutions", content: <LandingPage /> },
];
const getPages = () => {
    let pages = startPages;
    publications.forEach((publication) => {
        pages.push({
            route: "/" + publication.number,
            title: publication.title,
            content: publication.element
        })
    });
    return pages;
}

const pages = getPages();




