import http from "http";
const port = process.env.PORT || 8000;
import { logger } from "./utils/logger.js";
import {
    readnotes,
    addnotes,
    deletnote,
    getnotes,
    putnotes,
} from "./utils/filemanager.js";

function setHeaders(res, contentType = "application/json") {
    res.setHeader("Content-Type", contentType);
}

const gethandler = async (res) => {
    try {
        res.statusCode = 200;
        res.write(await readnotes());
        res.end();
    } catch (error) {
        res.statusCode = 404;
        logger.warn('No data in database');

        res.write(
            JSON.stringify({
                message: "Resource Not Found",
            })
        );
                    logger.error("JSON Body is invalid")

        return error;
    }
};
const getidhandler = async (req, res, spilt) => {
    try {

        res.statusCode = 200;
        if (req.method == "GET") {
            const id = spilt[1];
            const response = await getnotes(id);
            res.write(`${JSON.stringify(response)}`);
            logger.info(response)

            res.end();
        } else if (req.method == "DELETE") {
            const id = spilt[1];
            const response = await deletnote(id);
            res.write(`${JSON.stringify(response)}`);
            logger.info(response)
            res.end();
        } else if (req.method == "PUT") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", async () => {
                console.log(1);
                let check_body = JSON.parse(body)
                if (Object.keys(check_body).length===0) {
                    res.statusCode = 400;
                    res.write(
                        JSON.stringify({
                            message: "Empty body",
                        })
                    );

                    res.end(JSON.stringify({ error: "Empty request body" }));
                    return;
                } else {
                    try {
                        const parsed_body = JSON.parse(body);
                        console.log(typeof parsed_body);
                        const response = await putnotes(parsed_body);
                        res.write(`${JSON.stringify(response)}`);
                        logger.info(response)
                        res.end();
                    } catch (e) {
                        console.log(e);
                        return e;
                    }
                }
            });
        } else {
            res.statusCode = 405;
            res.write("Method Not Allowed");
                        logger.error("Method is not allowwed")

            return;
        }
    } catch (error) {
        res.statusCode = 404;
        res.write(
            JSON.stringify({
                message: "Resource Not Found",
            }) 
            
        );
        logger.error("JSON Body is invalid")
        return error;
    }
};
const posthandler = async (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        console.log(body)
        body += chunk.toString();
    });
    
    
    
    req.on("end", async () => {
        try {
            console.log("demo")
            let check_body = JSON.parse(body);
               if (!body) {
                res.statusCode = 400;
                res.end("Empty request body");
                                logger.warn("Json body is empty for post")

                return;
            }else
            if (Object.keys(check_body).length===0) {
                res.statusCode = 400;
                res.write(
                    JSON.stringify({
                        message: "empty body"
                    })
                    
                )
                logger.warn("Json body is empty for post")
                
                

                
                return res.end();
            } 
            
            else {
                console.log(12)
                const parsed = JSON.parse(body);

                const response = await addnotes(parsed);
                res.statusCode = 200;

                res.write(`${response}`);
                res.end();
            }
        } catch (error) {
            res.statusCode = 404;
            res.write(
                JSON.stringify({
                    message: "Resource Not Found",
                })
            );
            logger.error("JSON Body is invalid")
            res.end();
            return error;
        }
    });
};

    const server = http.createServer((req, res) => {
                  logger.info(`Incoming ${req.method} request to ${req.url}`);

        const spilt = req.url.split("/").filter(Boolean);
        if (spilt.length == 1 && spilt[0] == "notes" && req.method == "GET") {
            setHeaders(res);
            gethandler(res);
        } else if (spilt.length == 2 && spilt[0] == "notes" && req.method == "GET") {
            setHeaders(res);
            getidhandler(req, res, spilt);
        } else if (spilt.length == 1 && spilt[0] == "notes" && req.method == "POST") {
    
            setHeaders(res);
            posthandler(req, res);
        } else if (
            spilt.length == 2 &&
            spilt[0] == "notes" &&
            req.method == "DELETE"
        ) {
            getidhandler(req, res, spilt);
        } else if (spilt.length == 1 && spilt[0] == "notes" && req.method == "PUT") {
            setHeaders(res);
            getidhandler(req, res, spilt);
        } else {
            setHeaders(res);
            res.statusCode = 404;
            logger.error("Invalid Route")
            res.end(JSON.stringify({ error: "Route not found" }));
        }
    });
    


server.listen(port, () => {
   logger.info('Server started on http://localhost:3000');

});

// 🛑 Global error handlers
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('SIGINT', () => {
  logger.info('Server shutting down...');
  process.exit();
});
