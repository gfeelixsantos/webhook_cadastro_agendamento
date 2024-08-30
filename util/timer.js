async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 7500));
}

module.exports = timer