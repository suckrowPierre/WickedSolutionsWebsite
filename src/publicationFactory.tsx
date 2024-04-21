import * as elements from "typed-html";
import {Author, PublicationData, PublicationImageGrid} from "./components/common/PublicationImageGrid";
import * as fs from "fs";
import {Publication} from "./components/common/Publication";

export {getPublications, Publication }

interface WorkInfo {
    "id": string;
    "authors": string;
    "title": string;
    "text-align-last": string;
    "emoji"?: string;
}

interface PublicationInfo {
    "number": number;
    "about": string;
    "works": WorkInfo[];
}

interface Publication {
    title: string;
    number: number;
    element: any;
}

function createAboutText(publicationInfo: PublicationInfo) {
    const replaceAuthors = publicationInfo.about.replace(/\$(\w+)\$/g, (match, id) => {
        const work = publicationInfo.works.find(work => work.id === id);
        if (!work) {
            console.error(`No authors found for work with id ${id}`);
            return match;
        }
        const authors = work.authors;
        const element = Author({author: authors, id: work.id}) as any;
        return element;
    });
    const replacedEmoji = replaceAuthors.replace(/§(\w+)§/g, (match, id) => {
        const work = publicationInfo.works.find(work => work.id === id);
        if (!work) {
            console.error(`No emoji found for work with id ${id}`);
            return match;
        }
        return `[${work.emoji}]`;
    });
    return replacedEmoji;
}


function createPublicationData (publicationInfo: PublicationInfo, volume: number, createStatic: boolean = false): PublicationData[] {
    const dataPath = createStatic ? `volumes/${volume}/` : `public/volumes/${volume}/`;
    let publicationsData = [] as PublicationData[];
    for (const work of publicationInfo.works) {
        const publication: PublicationData = {
            "id": work.id,
            "title": work.title,
            "imagePath": `${dataPath + work.id}.jpg`,
            "pdfPath": `${dataPath + work.id}.pdf`,
            "text-align-last": work["text-align-last"],
            "emoji": work.emoji
        }
        publicationsData.push(publication);
    }
    return publicationsData;
}

function getPublications(createStatic: boolean = false): Publication[] {
    let publications = [] as Publication[];
    const volumes = getFoldersSync("public/volumes");
    for (const volume of volumes) {
        const publicationInfo = readPublicationInfo(parseInt(volume));
        const aboutText = createAboutText(publicationInfo);
        const publicationsData = createPublicationData(publicationInfo, parseInt(volume), createStatic );
        const publicationGrid = <PublicationImageGrid publications={publicationsData} />
        const publicationTitle = `Volume ${volume}`;
        const bibFilePath = createStatic ? `volumes/${volume}/references.bib` : `public/volumes/${volume}/references.bib`;
        const publicationElement = <Publication title={publicationTitle} about={aboutText} bibFilePath={bibFilePath} children={publicationGrid} />
        publications.push({
            number: parseInt(volume),
            title: publicationTitle,
            element: publicationElement
        });
    }
    return publications;
}

function getFoldersSync(directoryPath) {
    let folders = [];
    const files = fs.readdirSync(directoryPath, { withFileTypes: true });
    files.forEach(file => {
        if (file.isDirectory()) {
            folders.push(file.name);
        }
    });
    return folders;
}

function readPublicationInfo(volume: number): PublicationInfo {
    const publicationInfoPath = `public/volumes/${volume}/publication.json`;
    const object = JSON.parse(fs.readFileSync(publicationInfoPath, "utf8"));

    return {
        number: volume,
        ...object
    }
}