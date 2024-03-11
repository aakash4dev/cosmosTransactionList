// wait n seconds function
function wait(n) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, n * 1000);
    });
}

function extractText(node) {
    node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
            textContent += child.nodeValue;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            extractText(child);
        }
    });
}

async function main(){
    let opblockpost = document.getElementsByClassName("opblock opblock-post");

    for (let i = opblockpost.length - 1; i >= 0; i--) {
        let opblockSummary= opblockpost[i].getElementsByClassName("opblock-summary")[0]
        opblockSummary.click();
    }
    await wait(5);
    let txs = [];
    let microlight = document.getElementsByClassName("body-param__example microlight");
    let textContent = '';
    let json = {};

    for (let i = 0; i < opblockpost.length; i++) {
        textContent = '';
        extractText(microlight[i])
        json = JSON.parse(textContent.trim());
        json["@type"]= opblockpost[i].getElementsByClassName("opblock-summary")[0].getElementsByClassName("nostyle")[0].innerText.trim();
        txs.push(json);
    }
    await wait(2);
    console.log(txs)
}
main();
// http://0.0.0.0:1317/cosmos/tx/v1beta1/txs/4F1A46BFE9CE28E51B2B9E42907AE355A9AB179A3F4C4650B3B22BB47B0A4F9F