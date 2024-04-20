import * as elements from "typed-html";
import {centering} from "./style";

export { MainContent, mainContentId }

const mainContentId = "main-content";

const mainContentClasses = `flex flex-col max-w-[700px] h-[80%] ${centering}`;

const MainContent = ({ children }: {children:any}) => (
    <main id={mainContentId} class={mainContentClasses}>
    {children}
    </main>
);