async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 5500));
}

module.exports = timer