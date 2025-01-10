document.addEventListener("DOMContentLoaded", function () {
    let orderContainer = document.querySelector('.diffActivity');

    function addLoginSection() {
        let newLogin = document.createElement('div');
        newLogin.classList.add('login');
        newLogin.innerHTML = `
        <div class="login-container">
            <div class="login-left">
                <div class="step-number">1</div>
                <div>
                    <div class="login-text">LOGIN <span class="checkmark">✔</span></div>
                    <div class="user-details"><span>Ankit Kumar </span> +919162893978</div>
                </div>
            </div>
            <button class="changeLogin">CHANGE</button>
        </div>
    `;

        orderContainer.appendChild(newLogin);

        newLogin.querySelector('.changeLogin').addEventListener('click', () => {
            newLogin.innerHTML = `
            <div class="heading"><span class="custom-span">1</span>LOGIN</div>
            <div style="display: flex;">
                <div class="userDetails">
                    <p style="color: grey;">Name <span style="color: black; font-size: 15px; margin-left: 15px;">Ankit Kumar</span></p>
                    <p style="color: grey;">Phone<span style="color: black; font-size: 15px; margin-left: 15px;">+919162893978</span></p>
                    <a href="/auth/login" class="logoutLink">Logout & Sign in to another account</a>
                    <button class="checkoutButton">CONTINUE CHECKOUT</button>
                </div>
                <div class="advantages">
                    <h3>Advantages of our secure login</h3>
                    <div class="advantage">
                        <span class="icon">🚚</span> Easily Track Orders, Hassle-free Returns
                    </div>
                    <div class="advantage">
                        <span class="icon">🔔</span> Get Relevant Alerts and Recommendations
                    </div>
                    <div class="advantage">
                        <span class="icon">⭐</span> Wishlist, Reviews, Ratings, and more.
                    </div>
                </div>
            </div>
            <p class="note">Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to the home page.</p>`;
        });
    }

    function addDeliveryAddressSection() {
        let newDeliveryAddress = document.createElement('div');
        newDeliveryAddress.classList.add('deliveryAddress');
        newDeliveryAddress.innerHTML = `
        <div class="deliveryAddress-container">
            <div class="login-left">
                <div class="step-number">2</div>
                <div>
                    <div class="login-text">DELIVERY ADDRESS <span class="checkmark">✔</span></div>
                    <div class="user-details"><span>Ankit Kumar </span></div>
                </div>
            </div>
            <button class="changeDeliveryAddress">CHANGE</button>
        </div>
    `;

        orderContainer.appendChild(newDeliveryAddress);

        newDeliveryAddress.querySelector('.changeDeliveryAddress').addEventListener('click', () => {
            newDeliveryAddress.innerHTML = `
            <div class="heading"><span class="custom-span">2</span>DELIVERY ADDRESS</div>
            <button id="editAddress" class="editButton" style="position: relative; left:85%; top: 10px; color: blue; border: none; padding: 5px 10px; cursor: pointer;">EDIT</button>
            <div class="userDetails">
                <p style="color: grey; margin-left: 25px; font-size:10px;">
                    <span style="color: black; font-size: 13px;">Ankit Kumar</span>
                </p>
                <p style="color: grey; margin-left: 25px; font-size:10px;">
                    <span style="color: black; font-size: 13px;">IIT Goa Hostel, B1-102, IIT Goa hostel premise, Bandora, Goa - 403401</span>
                </p>
                <button class="checkoutButton" id="saveAndContinue">SAVE & CONTINUE</button>
            </div>`;

            const editAddressButton = newDeliveryAddress.querySelector('#editAddress');
            if (editAddressButton) {
                editAddressButton.addEventListener('click', () => {
                    newDeliveryAddress.innerHTML = `
                    <div class="heading"><span class="custom-span">2</span>EDIT DELIVERY ADDRESS</div>
                    <form action="/editAddress" method="post" id="editAddressForm" style="margin-left: 25px;">
                        <div style="display:flex; ">
                                <div class="inputField" onclick="document.getElementById('userName').focus()">
                                    <label for="userName" class="placeholder">Name</label>
                                    <input type="text" id="userName">
                                </div>
                                <div class="inputField" onclick="document.getElementById('mobileNo').focus()">
                                    <label for="mobileNo" class="placeholder">10-digit mobile number</label>
                                    <input type="text" id="mobileNo">
                                </div>
                        </div>
                        <div style="display:flex; ">
                                <div class="inputField" onclick="document.getElementById('pincode').focus()">
                                    <label for="pincode" class="placeholder">Pincode</label>
                                    <input type="text" id="pincode">
                                </div>
                                <div class="inputField" onclick="document.getElementById('locality').focus()">
                                    <label for="locality" class="placeholder">Locality</label>
                                    <input type="text" id="locality">
                                </div>
                        </div>
                                <div class="inputField" onclick="document.getElementById('address').focus()" style="width:68%">
                                    <label for="address" class="placeholder">Address (Area and Street)</label>
                                    <input type="text" id="address" style="width:100%;height:100%;">
                                </div>
                                                   
                        
                        <div style="display:flex; ">
                                <div class="inputField" onclick="document.getElementById('city').focus()">
                                    <label for="city" class="placeholder">City/Address/Town</label>
                                    <input type="text" id="city">
                                </div>
                                <div class="inputField" onclick="document.getElementById('state').focus()">
                                    <label for="state" class="placeholder">State</label>
                                    <input type="text" id="state">
                                </div>
                        </div>
                        <div style="display:flex; ">
                                <div class="inputField" onclick="document.getElementById('landmark').focus()">
                                    <label for="landmark" class="placeholder">Landmark (optional)</label>
                                    <input type="text" id="landmark">
                                </div>
                                <div class="inputField" onclick="document.getElementById('alternateMobileNo').focus()">
                                    <label for="alternateMobileNo" class="placeholder">Alternate Phone No (optional)</label>
                                    <input type="text" id="alternateMobileNo">
                                </div>
                        </div>
                        
                        
                        <button type="submit" class="checkoutButton">SAVE ADDRESS</button>
                    </form>`;

                    const editAddressForm = newDeliveryAddress.querySelector('#editAddressForm');
                    if (editAddressForm) {
                        editAddressForm.addEventListener('submit', (event) => {
                            event.preventDefault();
                            const name = editAddressForm.querySelector('#name').value;
                            const address = editAddressForm.querySelector('#address').value;
                            newDeliveryAddress.innerHTML = `
                            <div class="deliveryAddress-container">
                                <div class="login-left">
                                    <div class="step-number">2</div>
                                    <div>
                                        <div class="login-text">DELIVERY ADDRESS <span class="checkmark">✔</span></div>
                                        <div class="user-details"><span>${name} </span></div>
                                        <div class="user-details"><span>${address} </span></div>
                                    </div>
                                </div>
                                <button class="changeDeliveryAddress">CHANGE</button>
                            </div>`;
                        });
                    }
                });
            }

            const saveAndContinueButton = newDeliveryAddress.querySelector('#saveAndContinue');
            if (saveAndContinueButton) {
                saveAndContinueButton.addEventListener('click', () => {
                    newDeliveryAddress.innerHTML = `
                <div class="deliveryAddress-container">
                    <div class="login-left">
                        <div class="step-number">2</div>
                        <div>
                            <div class="login-text">DELIVERY ADDRESS <span class="checkmark">✔</span></div>
                            <div class="user-details"><span>Ankit Kumar </span></div>
                        </div>
                    </div>
                    <button class="changeDeliveryAddress">CHANGE</button>
                </div>
                `;
                });
            }
        });
    }

    addLoginSection();
    addDeliveryAddressSection();

    document.querySelector('.mainOrder').addEventListener('click', function (e) {
        if (e.target.classList.contains('addLogin')) {
            addLoginSection();
        } else if (e.target.classList.contains('addDeliveryAddress')) {
            addDeliveryAddressSection();
        }
    });
});

