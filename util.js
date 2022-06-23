function convertToJavaMap(str) {
    const chunkArray = (arr, chunkCount) => {
        const chunks = [];
        while (arr.length) {
            const chunkSize = Math.ceil(arr.length / chunkCount--);
            const chunk = arr.slice(0, chunkSize);
            chunks.push(chunk);
            arr = arr.slice(chunkSize);
        }
        return chunks;
    }

    let x = str.split("\t").flatMap(x => x.split("\n"))
    let pair = chunkArray(x, x.length / 2)
    let joined = pair.map(p => `parameters.put("${p[0]}", ${p[1].replaceAll('\"', '"')};`).join("\n")
    console.log(joined)
}