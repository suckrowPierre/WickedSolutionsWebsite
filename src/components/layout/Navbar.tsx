import * as elements from "typed-html";
import {PageConfig} from "../../pages";
import {link} from "../common/style";
import {mainContentId} from "../common/MainContent";

export {Navbar}

const Navbar = ({pages}: {pages: PageConfig[]}) => {
    const pagesWithoutHome = pages.filter(page => (page.route !== "/" && page.route !== "index.html"));
    const target = `#${mainContentId}`;
    return (
        <nav>
            <ul class="grid grid-cols-4">
                {pagesWithoutHome.map(page => (
                    <li>
                        <a href={page.route} class={link}>{page.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

/*
 <button hx-get={page.route}
                                hx-target={target}
                                hx-push-url="true"
                                hx-swap="innerHTML"
                                class={link}
                        >{page.title}</button>
 */