import {Daniel, DC, TU, UDK} from "../common/Links";
import * as elements from "typed-html";
import {Paragraph} from "../common/Paragraph";


export {LandingPage}

const text = `
Wicked Solutions is a yearly compendium of scientific articles delivered by students of the course <i>“Introduction to Optimization and Problem Solving in Coding and Making”</i> which is a course offered by prof. ${Daniel} to first semester Master students of the ${UDK} / ${TU} Study program ${DC}.
`

const LandingPage = () => (
    <div class="w-5/6">
       <Paragraph text={text}/>
    </div>
)