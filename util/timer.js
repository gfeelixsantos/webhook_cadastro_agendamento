async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 3500));
}

module.exports = timer