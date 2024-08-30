async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 10000));
}

module.exports = timer