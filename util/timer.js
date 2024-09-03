async function timer() {
    return await new Promise((resolve) => setTimeout(resolve, 6500));
}

module.exports = timer