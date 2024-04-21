import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import { staticPlugin } from '@elysiajs/static'
import { BaseHTML } from "./components/BaseHTML";
import {getPages, PageConfig} from "./pages";



async function startServer() {
    console.log("Starting server...");
    const app = new Elysia().use(html());
    const port = process.env.PORT;
    app.use(staticPlugin()).listen(port);
    const pages = getPages();

    async function setupRoute(page: PageConfig) {
        app.get(page.route, async ({ request, html }) => {
            const isHtmxRequest = request.headers.get("hx-request") === "true";

            const content = typeof page.content === "function"
                ? await page.content()
                : page.content;

            if (isHtmxRequest) {
                return html(content);
            } else {
                return (
                    <BaseHTML pages={pages}>
                        {content}
                    </BaseHTML>
                )
            }
        });
    }

    pages.forEach(page => {
        setupRoute(page);
    });

    console.log(`Server is running at http://${app.server?.hostname}:${app.server?.port}`);
}

startServer().catch(console.error);