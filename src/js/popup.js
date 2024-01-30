



function showResponse(message) {
    /**
     * It will be used to show resposne to the user
     */
    const responseElem = document.querySelector("#message");
    const responseContainer = document.querySelector(".response-container");

    responseElem.innerHTML = message;
    responseContainer.classList.remove("d-hidden");

    setTimeout(() => {
        responseContainer.classList.add("d-hidden");
    }, 3000)
}



function visualize(scrapedData) {
    /**
     * It will be used to visualize the data
     */

    if (!scrapedData.DATA.DATA) {
        showResponse("Data could not be fethced from the page try to reload the page.");
        return;


    }
    showResponse("Success!")
    scrapedData = scrapedData.DATA.DATA;
    if (scrapedData.length === 0) {
        showResponse("we dont support these pages, we only support daily weather data.");
        return;
    }

    const dates = scrapedData.map(entry => entry.date);
    const lowTemps = scrapedData.map(entry => entry.low_temp);
    const highTemps = scrapedData.map(entry => entry.high_temp);

    const ctx = document.getElementById('temperatureChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Low Temperature',
                    data: lowTemps,
                    borderColor: 'blue',
                    fill: false,
                },
                {
                    label: 'High Temperature',
                    data: highTemps,
                    borderColor: 'red',
                    fill: false,
                },
            ],
        },
    });

    const createBtn = document.querySelector("#createBm");

    createBtn.disabled = true;

}


function startWorking() {
    try {

        chrome.runtime.sendMessage({ ACTION: 1 }, (response) => {
            if (response) {
                if (!response.ERROR) {
                    visualize(response);
                }
                else {
                    showResponse("Something went wrong while showing graph. please got to daily weather page of accuweather.com or reload the site.")
                }

            }



        });
    }
    catch (error) {
        showResponse("Something went wrong while showing graph. please got to daily weather page of accuweather.com or reload the site.")
    }

}


function main() {

    const createBtn = document.querySelector("#createBm");
    createBtn.addEventListener("click", startWorking)
}

document.addEventListener("DOMContentLoaded", () => {
    main();
})
