function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function calculoDificil(num) {
    const arrayNum = []
    let numeritos = {}
    for (let i = 0; i < num; i++) {

        let rdmNum = getRandomInt(0, 1001)
        arrayNum.push(rdmNum)

    }
    const cleanedArr = [...new Set(arrayNum)]

    arrayNum.forEach((numero) => {
        numeritos[numero] = (numeritos[numero] || 0) + 1;
    });
    //console.log(numeritos)
    let largoDeObj = Object.keys(numeritos).length
    return numeritos
}