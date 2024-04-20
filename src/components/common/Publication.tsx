import {H2Left} from "./Titles";
import {link} from "./style";
import * as elements from "typed-html";
import {Paragraph} from "./Paragraph";


export {Publication}

const downloadBibClasses = `absolute right-0 top-0 ${link}`;

const DownloadBib = ({ bibFilePath }: { bibFilePath: string }) => (
    <a href={bibFilePath} class={downloadBibClasses} download>
        Cite
    </a>
);

const Publication = ({ title, about, children, bibFilePath }: { title: string, about: any, children:any, bibFilePath:string }) => (
    <div class="h-[90%]">
        <H2Left text={title} />
        <div class="py-8">
            <Paragraph text={about} />
        </div>
        <div class="relative py-8 w-full">
            {children}
            <DownloadBib bibFilePath={bibFilePath} />
        </div>
    </div>
);