export function getRandom(num1, num2) {
    if (num1 !== undefined && num2 !== undefined) {
        return num1 + Math.random() * (num2 - num1);
    } else if (num1 !== undefined && num2 === undefined) {
        return Math.random() * num1;
    } else {
        return Math.random();
    }
}


export function getRectData(totalRow, totalCol, startX, startY) {
    let result = [];

    if (startX === undefined) {
        startX = -totalCol / 2;
    }

    while (totalCol--) {
        startX += 1

        let curY = 0

        if (startY === undefined) {
            curY = -totalRow / 2;
        }

        let curCol = totalRow;

        while (curCol--) {
            curY += 1
            result.push(getCurRect(startX, curY))
        }
    }

    return result
}

export function getCurRect(x, y) {
    let border = 0.1
    return {
        contour: [[x + border, y + border], [x + 1 - border, y + border], [x + 1 - border, y + 1 - border], [x + border, y + 1 - border]]
    }
}

export function getScatterPlot(totalRow, totalCol, startX, startY) {
    let result = [];

    if (startX === undefined) {
        startX = -totalCol / 2;
    }

    while (totalCol--) {
        startX += 1

        let curY = 0

        if (startY === undefined) {
            curY = -totalRow / 2;
        }

        let curCol = totalRow;

        while (curCol--) {
            curY += 1
            result.push({ name: 'Colma', passengers: 3000000000, coordinates: [startX, curY] })
        }
    }

    return result
}