
const loadCategoryBtn = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategoryBtn(data.categories))
        .catch(err => console.log("ERROR", err))

}

const displayCategoryBtn = (categories) => {

    // console.log(categories);

    const dynamicBtnContainer = document.getElementById("dynamic-btn");

    categories.forEach(category => {

        // console.log(category)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        
        <button id="btn-${category.category}" onclick ="loadCategoryCard('${category.category}')" class="btn py-6 md:px-18 md:py-10 font-bold md:text-xl gap-1 md:gap-3 categories-btn md:rounded-[60px]">

        <img class ="w-5 md:w-10" src=${category.category_icon} alt="">
        ${category.category}
        
        </button>

        `
        dynamicBtnContainer.append(btnDiv);
    });

}

loadCategoryBtn();


// load category pet card 

const loadAllPetCard = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => {

            displayPetCard(data.pets)
        })
        .catch(err => console.log("ERROR", err))

}

const displayValue = (value) => {

    if (value === null || value === undefined || value === "" || value === "null" || value === "undefined") {
        return "Not Available";
    }
    else {
        return value;
    }
}

const displayPetCard = (allPets) => {

    // document.getElementById("spinner").classList.remove("hidden")

    const dynamicPetCard = document.getElementById("add-card");


    dynamicPetCard.innerHTML = "";

    if (allPets.length == 0) {

        dynamicPetCard.classList.remove("grid")
        dynamicPetCard.innerHTML = `
        
        <div class="h-[500px] items-center text-center space-y-7 flex flex-col justify-center">

    <img src="images/error.webp" alt="">
    <h2 class="font-bold text-xl md:text-3xl">No Information Available</h2>
    <p class="md:w-3/5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>

</div>
        
        `;
    }
    else {
        dynamicPetCard.classList.add("grid")
    }

    allPets.forEach(pet => {

        const petDiv = document.createElement("div");
        petDiv.classList = ("card bg-base-100 p-4 border border-gray-200");
        petDiv.innerHTML = `

        
         <figure>
    
                <img class="h-[180px] object-cover w-full rounded-md" src=${pet.image} alt="Shoes" />
         </figure>
             <div class="card-body">

             <div class="mt-4">

               <h2 class="text-3xl font-bold mb-6 "> ${displayValue(pet.pet_name)}</h2>

        <div class="flex gap-2 text-base items-center">
            <i class="fa-solid fa-border-all"></i>
            <h3 class="">Breed: ${displayValue(pet.breed)}</h3>
        </div>

        <div class="flex gap-2 text-base items-center">
             <i class="fas fa-calendar-alt"></i>
            <h3 class="">Birth: ${displayValue(pet.date_of_birth)}</h3>
        </div>

        <div class="flex gap-2 text-base items-center">
          <i class="fa-solid fa-mercury"></i>
            <h3 class="">Gender: ${displayValue(pet.gender)}</h3>
        </div>

        <div class="flex gap-2 text-base items-center">
            <i class="fa-solid fa-dollar-sign"></i>
            <h3 class=""> Price: ${displayValue(pet.price)}</h3>
        </div>
  
    </div>
    <div class="divider"></div>
    <div class="flex justify-around md:justify-between ">
        <button onclick="addPetPic('${pet.image}')" class="">
        <a class="btn w-10 h-10 border border-teal-700 rounded-xl px-9 md:px-7 hover:bg-[#10879024]">
                <i class="fa-regular fa-thumbs-up"></i>
                </a>
        </button>
        <button class="btn px-7 rounded-lg text-teal-800 font-semibold border-teal-700 hover:bg-teal-700 hover:text-white"> Adopt </button>
        <button onclick="loadPetDetails(${pet.petId})" class="btn px-7 rounded-lg text-teal-800 font-semibold border-teal-700 hover:bg-teal-700 hover:text-white"> Details </button>


    </div>
             
             </div>
              
              <div>
      
                
                </div>
                
        `

        dynamicPetCard.append(petDiv)


    })

}

loadAllPetCard();

const removeActiveBtnClass = () => {

    const categoriesAllBtn = document.getElementsByClassName("categories-btn");

    for (let categoryBtn of categoriesAllBtn) {
        categoryBtn.classList.remove("active-btn")
    }
}

const loadCategoryCard = (categoryPetName) => {
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("add-card").classList.add("hidden")


    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryPetName}`)
        .then(res => res.json())
        .then(data => {
            const activeBtn = document.getElementById(`btn-${categoryPetName}`);

            // remove active btn class----
            removeActiveBtnClass();

            // add active btn class-

            activeBtn.classList.add("active-btn");

            displayPetCard(data.data)

            // spinner time set 2s--
            setTimeout(() => {

                document.getElementById("spinner").classList.add("hidden");
                document.getElementById("add-card").classList.remove("hidden")

            }, 2000)

        })
        .catch(err => console.log("ERROR", err))

}

const loadPetDetails = (id) => {

    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then((data) => {

            //send data to add photo card --

            // details card 
            displayPetDetails(data.petData)

        })
}

const displayPetDetails = (details) => {

    console.log(details.breed)
    const modalContent = document.getElementById("input-details");
    modalContent.innerHTML = `
    
                    <div class="p-4">
                        <img class="w-full object-cover h-[400px] rounded-lg" src=${details.image} />
                        <div class="">

                            <div class="mt-4">

                                <h2 class="text-3xl font-bold mb-6 "> ${displayValue(details.pet_name)}</h2>

                                <div class="flex gap-2 text-base items-center">
                                    <i class="fa-solid fa-border-all"></i>
                                    <h3 class="">Breed: ${displayValue(details.breed)}</h3>
                                </div>

                                <div class="flex gap-2 text-base items-center">
                                    <i class="fas fa-calendar-alt"></i>
                                    <h3 class="">Birth: ${displayValue(details.date_of_birth)}</h3>
                                </div>

                                <div class="flex gap-2 text-base items-center">
                                    <i class="fa-solid fa-mercury"></i>
                                    <h3 class="">Gender: ${displayValue(details.gender)}</h3>
                                </div>

                                <div class="flex gap-2 text-base items-center">
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <h3 class=""> Price: ${displayValue(details.price)}</h3>
                                </div>

                                <div class="flex gap-2 text-base items-center">
                                    <i class="fa-solid fa-mercury"></i>
                                    <h3 class=""> Vaccinated status : ${displayValue(details.vaccinated_status)}</h3>
                                </div>

                            </div>

                            <div class="divider w-[90%] mx-auto"></div>

                           
                             <div>
                                <h2 class="font-bold text-xl">Details Information</h2>
                                <p class="text-sm/7">'${details.pet_details}'</p>
                                
                             </div>


                        </div>

                    </div>

    `
    document.getElementById("details-container").showModal();


}
// sort function --

document.getElementById("sort-btn").addEventListener("click", () => {

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => {
            data.pets.sort((a, b) => {
                return b.price - a.price;
            });
            displayPetCard(data.pets)

        }
        )
})


const addPetPic = (imgUrl) => {
   const addPicContainer = document.getElementById("add-pic");

    const div = document.createElement("div");
    div.innerHTML = `
    
    <img class="object-cover rounded-md" src ="${imgUrl}" />

    
    `
    
    addPicContainer.append(div);

}