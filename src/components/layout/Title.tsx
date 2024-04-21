import * as elements from "typed-html";
import {H1} from "../common/Titles";
import {mainContentId} from "../common/MainContent";

export {Title}

const Title = ({title, route}: {title: string, route: string}) => {
    const target = `#${mainContentId}`;
    return (
        <a href={route} class="link">
            <H1 text={title} />
        </a>
    )
}

/*
<button hx-get={"/"}
                hx-target={target}
                hx-push-url="true"
                hx-swap="innerHTML"
        >
 */