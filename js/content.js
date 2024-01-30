

function startScraping() {
    /**
     * It will start collecting data and will return that data
     */
    let dataArray = [];
    const allWeatherCards = document.querySelectorAll(".daily-forecast-card");
    for (card of allWeatherCards) {
        const date = card.querySelector(".date").textContent.trim().replace(/\t/g, '').replace(/\n/g, '');
        const highTemp = card.querySelector(".high").textContent.replace("°", "");
        const lowTemp = card.querySelector(".low").textContent.replace("°", "").replace("/", "");

        dataArray.push({
            'date': date,
            'low_temp': parseInt(lowTemp),
            'high_temp': parseInt(highTemp)
        })
    }

    return dataArray;

}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message) {
        if (message.ACTION === 1) {

            const data = startScraping();
            sendResponse({ DATA: data });
        }
    }


});