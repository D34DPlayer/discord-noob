exports.run = (options, eventEmitter) => {
    let contents;
    if (!(options.content instanceof Array)) options.content = [options.content];
    switch (eventEmitter.event) {
        case "command":
        case "messageDelete":
        case "message": contents = [eventEmitter.eventArgs[0].content]; break;

        case "messageDeleteBulk": contents = eventEmitter.eventArgs[0].reduce((arr, msg) => arr.push(msg.content), []); break;

        case "messageReactionAdd":
        case "messageReactionRemove":
        case "messageReactionRemoveEmoji": contents = [eventEmitter.eventArgs[0].emoji.toString()]; break;
    }

    for (let content of contents) {
        for (let option of options.content) {
            if (content.match(option) && content.match(content)[0].length) return true;
        }
    }
    return false;
}