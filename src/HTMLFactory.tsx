import { BaseHTML } from "./components/BaseHTML";
import {getPages} from "./pages";
import * as fs from "fs";
import * as elements from "typed-html";


async function createAndSaveHTMLPages() {
    const pages = getPages(true);
    pages.forEach(page => {
        const HTML = <BaseHTML pages={pages}>
            {page.content}
        </BaseHTML>
        const htmlString = HTML.toString();
        const path = `public/${page.route}`
        fs.writeFileSync(path, htmlString);
    });
}

createAndSaveHTMLPages().catch(console.error);