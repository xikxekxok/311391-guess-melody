const addToLog = (oldLog, newResult) => {
    let result = {
        log: oldLog
            ? oldLog.log
            : []
    };

    result.current = newResult;

    if (oldLog) {
        result.log.push(oldLog.current);
    }

    return result;
}

export default addToLog;
