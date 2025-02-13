import { pino } from "pino";

const logger = pino({
    level: "info",
    formatters: {
        level: (label: string) => ({ level: label.toUpperCase() })
    },
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
    messageKey: "message",
    nestedKey: "payload"
});

export default logger;
