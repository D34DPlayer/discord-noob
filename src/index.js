'use_strict';

const Util = require('./util/Util');
const Command = require('./structures/Command');
const Group = require('./structures/Group');
const Converters = require('./util/Converters');
const Extractors = require('./util/Extractors');

module.exports = {

    Client: require('./client/Client'),

    Util: Util,

    Converters: Converters,

    Extractors: Extractors,

    Command: Command,

    Group: Group,

    parseFunction: Util.parseFunction,
    parseBracket: Util.parseBracket,
    getAllBracket: Util.getAllBracket,
    parserMessage: Util.parserMessage,

};
