import crypto from "crypto";

export const requestId = (req, res, next) => {
    // Client ne request ID bheji hai to use karo,
    // otherwise new ID generate karo
    const requestId =
        req.headers["x-request-id"] || crypto.randomUUID();

    // Request object mein store
    req.requestId = requestId;

    // Response header mein bhi bhejo
    res.setHeader("X-Request-ID", requestId);

    next();
};