const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("doctorId");
    loadTime(param)
    fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
      .then((res) => res.json())
      .then((data) => displayDetails(data));

    fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
      .then((res) => res.json())
      .then((data) => doctor_review(data));
};

const doctor_review = (reviews) =>{
    console.log(reviews)
    reviews.forEach((review) =>{
        const parent  = document.getElementById("doc-review-container")
        const div = document.createElement("div")
        div.classList.add("review-card")
        div.innerHTML=`
            <img class="rev-img " src="images/man-1.jpg" alt="">
            <h4>${review.reviewer}</h4>
            <p>${review.body.slice(0,100)}</p>
            <h5>${review.rating}</h5>
        `
        parent.appendChild(div)

    })

}


const displayDetails = (doctor) =>{
    console.log(doctor)
    const parent = document.getElementById("doc-details")
    const div = document.createElement("div")
    div.classList.add("doc-details-container")
    div.innerHTML = `
    <div>
        <img class="doctor-img" src=${doctor.image} alt="">
    </div>
    <div class="doc-info">
        <h3>${doctor.full_name}</h3>
        ${
            doctor.specialization.map((item) =>{
                return `<button class="doc-detail-btn">${item}</button>`
            })
        }
        ${
            doctor.designation.map((item) =>{
                return `<h4>${item}</h4>`
            })
        }
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ut unde aut amet corrupti alias?</p>
        <h5>Fees: ${doctor.fee}</h5>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Take Appointment
        </button>
       </div>
    `
    parent.appendChild(div)

}

const loadTime = (id) =>{
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`)
    .then((res) => res.json())
    .then((data) => 
        data.forEach((item) =>{
            const parent = document.getElementById("time-container")
            const option = document.createElement('option')
            option.value = item.id
            option.innerText = item.name 
            parent.appendChild(option)
        })
    )
}

const handleAppointment =() =>{
    const param = new URLSearchParams(window.location.search).get("doctorId");
    const status = document.getElementsByName("status")
    const selected = Array.from(status).find((button)=>button.checked)
    const symtom = document.getElementById("symtom").value
    

    //  getting time 
    const time = document.getElementById("time-container")
    const selectedTime = time.options[time.selectedIndex]
    const patient_id = localStorage.getItem('patient_id')

    const info = {
        appointment_type: selected.value,
        appointment_status: "Pending",
        time: selectedTime.value,
        symptom: symtom,
        cancel: false,
        patient: patient_id,
        doctor: param,
      };
    
    console.log(info)
    fetch("https://testing-8az5.onrender.com/appointment/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
       
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

    })
    
}

getparams()


const loadPatientId = () => {
    const user_id1 = localStorage.getItem("user_id");
    console.log(user_id1)
  
    fetch(`https://testing-8az5.onrender.com/patient/list/?user_id=${user_id1}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("patient_id", data[0].id);
      });
  };
  
loadPatientId();




