let offerCount = 1;
const offersContainer = document.getElementById("offersContainer");
const addOfferButton = document.getElementById("addOfferButton");

addOfferButton.addEventListener("click", () => {
    offerCount = offersContainer.getElementsByClassName("offer").length + 1; // Update the offer count
    const newOffer = document.createElement("div");
    newOffer.className = "offer";
    newOffer.innerHTML = `
        <h2>Offer ${offerCount}</h2>
        <input type="text" name="offerType[]" placeholder="Offer Type (e.g., Discount, Cashback)" style="margin-left: 50px; padding: 10px; width: 90%; font-size: 20px;"  />
          
        <input type="text" name="offerDescription[]" placeholder="Offer Description" style="margin-left: 50px; padding: 10px; width: 90%; font-size: 20px;"  />
          
        <input type="date" name="offerValidTill[]" placeholder="Valid Till" style="margin-left: 50px; padding: 10px; width: 90%; font-size: 20px;" />
          
        <button type="button" onclick="removeOffer(this)" 
    style="width: 200px; height: 40px; font-size: 20px; margin-top: 18px;margin-left:50px; color: white; background-color: #4CAF50; border: none; border-radius: 5px;">
        Remove Offer</button>
    `;
    offersContainer.appendChild(newOffer);
});

function removeOffer(button) {
    const offerElement = button.parentElement;
    offerElement.remove();

    const offerElements = offersContainer.getElementsByClassName("offer");
    Array.from(offerElements).forEach((offer, index) => {
        const heading = offer.querySelector("h2");
        if (heading) {
            heading.textContent = `Offer ${index + 1}`;
        }
    });
}


let imageCount = 1;
const imagesContainer = document.getElementById("imagesContainer");
const addImageButton = document.getElementById("addImageButton");
addImageButton.addEventListener("click", () => {
    imageCount = imagesContainer.getElementsByClassName("image").length + 1;
    const newImage = document.createElement("div");
    newImage.className = "image";
    newImage.innerHTML = `
        <h2>Image ${imageCount}</h2>
        <input type="url" name="imageURL[]" placeholder="Image URL" style="margin-left: 50px; padding: 10px; width: 90%; font-size: 20px;"  />
          
        <button type="button" onclick="removeImage(this)" 
    style="width: 200px; height: 40px; font-size: 20px;margin-left:50px; margin-top: 18px; color: white; background-color: #4CAF50; border: none; border-radius: 5px;">
        Remove</button>
    `;
    imagesContainer.appendChild(newImage);
})
function removeImage(button) {
    const imageElement = button.parentElement;
    imageElement.remove();
    const imageElements = imagesContainer.getElementsByClassName("image");
    Array.from(imageElements).forEach((image, index) => {
        const heading = image.querySelector("h2");
        if (heading) {
            heading.textContent = `Image ${index + 1}`;
        }
    })
}


let highlightCount = 1;
const highlightsContainer = document.getElementById("highlightsContainer");
const addHighlightButton = document.getElementById("addHighlightButton");

addHighlightButton.addEventListener("click", () => {
    highlightCount = highlightsContainer.getElementsByClassName("highlight").length + 1;
    const newHighlight = document.createElement("div");
    newHighlight.className = "highlight";
    newHighlight.innerHTML = `
        <h1 style="margin-top: 20px;">${highlightCount}</h1>
        <div class="key">
            <input type="text" name="highlightKey[]" placeholder="Key" style="width: 80%;" required />
            
        </div>
        <div class="value">
            <input type="text" name="highlightValue[]" placeholder="Value" style="width: 80%;" required />
            
        </div>
        <div>
<button type="button" onclick="removeHighlight(this)" 
    style="width: 200px; height: 40px;margin-left:50px; font-size: 20px; margin-top: 18px; color: white; background-color: #4CAF50; border: none; border-radius: 5px;">
    Remove
</button>
        </div>
    `;
    highlightsContainer.appendChild(newHighlight);
});

function removeHighlight(button) {
    const highlightElement = button.closest(".highlight");
    highlightElement.remove();

    const highlightElements = highlightsContainer.querySelectorAll(".highlight");
    highlightElements.forEach((highlight, index) => {
        const heading = highlight.querySelector("h1");
        if (heading) {
            heading.textContent = `${index + 1}`;
        }
    });

    highlightCount = highlightElements.length ? highlightElements.length : 1;
}


document.getElementById('productType').addEventListener("change", function () {
    const prodType = this.value;
    const specificationSection = document.getElementById('specificationSection');
    specificationSection.innerHTML = `<h2>${this.value} Specifications</h2>`;
    const specsMap = {
        Phone: ["RAM", "Storage", "Camera", "Processor", "Battery"],
        Printer: ["Printer Type", "Print Speed", "Connectivity", "Supported Paper Size"],
        Dress: ["Size", "Material", "Wash Care", "Fit Type"],
        Locket: ["Material", "Dimensions", "Weight", "Design"],
        Toy: ["Age Group", "Material", "Dimensions", "Safety Certification"],
        FoodItems: ["Ingredients", "Weight", "Expiry Date", "Nutritional Value"],
        Sports: ["Sport Type", "Material", "Dimensions", "Weight"],
        Healthcare: ["Composition", "Use Case", "Expiry Date", "Precautions"],
        Spectacles: ["Lens Material", "Frame Material", "Power", "Design Type"],
        Grooming: ["Item Type", "Ingredients", "Use Instructions", "Suitability"],
        Books: ["Author", "Genre", "Publisher", "ISBN", "Number of Pages"],
        Furniture: ["Dimensions", "Material", "Weight Capacity", "Assembly Details"],
        Stationery: ["Item Type", "Quantity", "Material", "Dimensions"],
        Bluetooths: ["Bluetooth Version", "Battery Life", "Noise Cancellation", "Connectivity"]
    };
    const selectedSpecs = specsMap[prodType] || [];

    selectedSpecs.forEach((spec) => {
        const newSpec = document.createElement("div");
        newSpec.className = "spec";
        newSpec.innerHTML = `
            <input type="text" name="${spec}" id="${spec}" placeholder="${spec}" style="margin-left: 60px; padding: 10px; width: 90%; font-size: 20px;" required />
              
        `;
        specificationSection.appendChild(newSpec);

    })


})