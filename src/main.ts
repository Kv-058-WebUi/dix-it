import {SERVER_PORT} from "./config";

import * as web from "./web";

async function main() {
    await web.start(SERVER_PORT);
    console.log(`Server started at http://localhost:${SERVER_PORT}`);
    console.log(`${process.env.PORT}`);
}

main().catch(error => console.error(error));
