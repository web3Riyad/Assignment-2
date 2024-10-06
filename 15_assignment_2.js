document.getElementById("search_btn").addEventListener("click", (event) => {
    const inputvalue = document.getElementById("input").value;

    // character wise search
    if (inputvalue.length == 1 && ((inputvalue >= 'a' && inputvalue <= 'z') || (inputvalue >= 'A' && inputvalue <= 'Z'))) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputvalue}`)
        .then(res => res.json())
        .then((data) => {
            if (data.meals) {
                display_data_char(data.meals);  
            } else {
                console.log("No data found for this letter");
            }
        });
    } 
    // string wise search
    else 
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`)
        .then(res => res.json())
        .then((data) => {
            if (data.meals) {
                display_data_char(data.meals);  
            } else {
                console.log("No data found for this letter");
            }
        });
    }
    document.getElementById("input").value='';
});

// Main api fetch
const loadallproduct = () => {
    fetch('https://themealdb.com/api/json/v1/1/search.php?s')
    .then(res => res.json())
    .then(data => {
        display_data(data.meals); 
    });
}

// call main Api
loadallproduct();

// display default meal item
const display_data = (ary) => {
    const contain = document.getElementById("left_container");

    ary.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("cart");
        div.innerHTML = `
        <img class="card_img" id="card_img" src="${element.strMealThumb}" alt="Category Image">
        <h2>${element.strCategory}</h2>  
        <button type="search" id="add_btn" >ADD to Cart</button>
        <button type="search" id="detail_btn" >Details</button>
        `;
        div.querySelector("#add_btn").addEventListener("click", () => add_to_cart(element));
        div.querySelector("#detail_btn").addEventListener("click", () => show_details(element));
        div.querySelector("#card_img").addEventListener("click", () => show_img_details(element));
        contain.appendChild(div);
    });
}


// display search wise meal item
const display_data_char = (ary) => {
    const contain = document.getElementById("left_container");
    contain.innerHTML = ''; 
    console.log(ary);

    ary.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("cart_char");
        div.innerHTML = `
        <img class="card_img" id="card_img" onclick="show_details(${element.idMeal},'${element.strCategory}')" src="${element.strMealThumb}" alt="Meal Image">
        <h2>${element.strMeal}</h2>  
        <button type="search" id="add_btn" >ADD to Cart</button>
        <button type="search" id="detail_btn">Details</button>
        `;
        div.querySelector("#add_btn").addEventListener("click", () => add_to_cart(element));
        div.querySelector("#detail_btn").addEventListener("click", () => show_details(element));
        div.querySelector("#card_img").addEventListener("click", () => show_img_details(element));
        contain.appendChild(div);
    });
}


const add_to_cart = (element) => {
    const mealitem = document.getElementById("card_body");
    const cnt = document.getElementById("count").innerText;
    let convertedcount = parseInt(cnt);
    convertedcount += 1;
    document.getElementById("count").innerText = convertedcount;


    const div = document.createElement("div");
    div.innerHTML = `
    <img class="card_img" src="${element.strMealThumb}" alt="Meal Image">
    <h4>${element.idMeal}</h4>
    <h3>${element.strCategory}</h3> 
    `;
    mealitem.appendChild(div);
};

// Modal show
const show_details=(element)=>{

    const modalContent = document.getElementById("modalDetails");
    modalContent.innerHTML =`
    <img class="card_img" src="${element.strMealThumb}" alt="Meal Image">
    <h3>${element.strCategory}</h3> 
    <p>${element.strInstructions.slice(0,200)}</p>
    `;

    const modal = document.getElementById("detailModal");
    modal.style.display = "block";

}


// modal show
const show_img_details = (element) => {

    const modalContent = document.getElementById("modalDetails");
    modalContent.innerHTML = `
    <h2>Details for ${element.strMeal}</h2>
    <ul>
        <li>Ingredient 1: ${element.strIngredient1}</li>
        <li>Ingredient 2: ${element.strIngredient2}</li>
        <li>Ingredient 3: ${element.strIngredient3}</li>
        <li>Ingredient 4: ${element.strIngredient4}</li>
        <li>Ingredient 5: ${element.strIngredient5}</li>
     </ul>
    `;

    const modal = document.getElementById("detailModal");
    modal.style.display = "block";
}

// Close the modal when the 'X' button is clicked
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("detailModal").style.display = "none";
});

window.onclick = function(event) {
    const modal = document.getElementById("detailModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}