import * as elements from "typed-html";
import {H1} from "../common/Titles";
import {mainContentId} from "../common/MainContent";

export {Title}

const Title = ({title}: {title: string}) => {
    const target = `#${mainContentId}`;
    return (
        <button hx-get={"/"}
                hx-target={target}
                hx-push-url="true"
                hx-swap="innerHTML"
        >
            <H1 text={title} />
        </button>
    )
}