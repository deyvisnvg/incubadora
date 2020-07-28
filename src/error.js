const error = {}

error.handleFatalError = (err) => {
    console.error("[FatalError]" + err.message);
    console.error("[FatalError]" + err.stack);
    process.exit(1);
}

error.handleError = (err) => {
    console.error("[FatalError2]" + err.message);
    // console.error("[FatalError2]" + err.stack);
}

module.exports = error;