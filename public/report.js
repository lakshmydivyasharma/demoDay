document.querySelector('.labTitle').addEventListener('change', (e)=>{
  report.labTitle = e.target.value
}) //change event listner = when the value inside this change changes, do something
// we are setting the lab title on our model to be the current value of the text area(text area = dom element and input, way we get the text out of it is the value which is the .value field)
// when i change the lab title, it changed it on the profile page too and vice versa bc i am synching it to DB

// document.querySelectorAll('[data-pos]').forEach(target => {
//   target.addEventListener('input', (e)=>{
//     report.sections[e.target.dataset.pos].text = e.target.innerText
//   })
// })
const tags = {title: 'h2', body: 'p'}
function toTitleCase(word){ //capitalizes first character of string (L.21)
  return word.slice(0,1).toUpperCase()+word.slice(1) //just get the first charracter, then the rest of it is saying get the rest  of the word
}
function addNewSection (type) { //this function adds a new section
  const sections = document.getElementById('sections') //getting the div=sections container from report.EJS

  //create the new section
  const div = document.createElement('div')
  div.className = 'section'

  //adding a new box (h2&p)
  const sectionElement = document.createElement(tags[type]) // need to provide tag, so we are using tags as a look up in tags the kind of element that we want for this section type
  sectionElement.className = `section${toTitleCase(type)}`
  sectionElement.setAttribute('contenteditable', 'true')
  sectionElement.innerText = type

  //creates the icon for deleting the section
  const span = document.createElement('span')
  const icon = document.createElement('i')
  icon.classList.add('fa', 'fa-trash')
  icon.setAttribute('aria-hidden', 'true')
  icon.addEventListener ("click", (e)=> {
    const sectionId = parseInt(e.target.parentElement.parentElement.id) //trash and section can grab the section ID
    report.sections=report.sections.filter((section) => { //each section object we have that has ID
      return section.id !== sectionId
    })
    e.target.parentElement.parentElement.remove() //function that doesnt take in any parameters; this removes section from the page
  })
  span.appendChild(icon)

  // adding section to the page
  div.appendChild(sectionElement)
  div.appendChild(span)
  sections.appendChild(div)

  // adding the section to the report itself for the DB, when its saved it can update in the DB and save
  const section = {position: report.sections.length, id:report.nextId, text: "", type: type} //object literal with multiple fields
  report.nextId+=1
  report.sections.push(section)

  //focus event fires when someone selects an element
  //blur is when an element STOPS being selected, like when you are no longer clicked into textbox
  //when done typing, & exit it -- keeps what you have on the page in sync with the report model
  sectionElement.addEventListener("blur",() =>{
    section.text = sectionElement.innerText
    console.log(sectionElement.innerText)
  })

  // icon trash to delete the section
  i.addEventListener("click",() =>{
    const sectionId = section.id //trash and section can grab the section ID
    report.sections=report.sections.filter((section) => { //each section object we have that has ID
      return section.id !== sectionId
    })
    i.parentElement.parentElement.remove() //function that doesnt take in any parameters; this removes section from the page
  })
}

//65-81: add event listeners to sections that have already been rendered that have been fetched from database;
document.querySelectorAll('.sectionText').forEach((sectionElement) => {
  // getting the corresponding section model for this textbox
  let relevantSection = null
  const sectionId = parseInt(sectionElement.parentElement.id)
  for(const section of report.sections){ // for each; for each section in report.sections
    if(section.id === sectionId){
      relevantSection = section
      break //found what we are looking for in the loop so we dont need to keep going in the loop
    }
  }

  //model in sync with the page
  sectionElement.addEventListener("blur",() =>{
    relevantSection.text = sectionElement.innerText
    console.log(sectionElement.innerText)
  })
})

function addNewSection (type) { //this function adds a new section
  const sections = document.getElementById('sections')
  const div = document.createElement('div')
  div.className = 'section'
  const sectionElement = document.createElement(tags[type]) // need to provide tag, so we are using tags as a look up in tags the kind of element that we want for this section type
  sectionElement.className = `section${toTitleCase(type)}`
  sectionElement.setAttribute('contenteditable', 'true')
  sectionElement.innerText = type
  const span = document.createElement('span')
  const icon = document.createElement('i')
  icon.classList.add('fa', 'fa-trash')
  icon.setAttribute('aria-hidden', 'true')

  span.appendChild(icon)
  div.appendChild(sectionElement)
  div.appendChild(span)
  sections.appendChild(div)
  const section = {position: report.sections.length, id:report.nextId, text: "", type: type}
  report.nextId+=1
  report.sections.push(section)
  sectionElement.addEventListener("blur",() =>{
    section.text = sectionElement.innerText
    console.log(sectionElement.innerText)
  })
}


//save button is what does the full update
// delete for sections that have already been rendered on the page like the previous chunk of code
document.querySelectorAll('.fa-trash').forEach((trashElement) => {
  trashElement.addEventListener("click",() =>{
    const sectionId = parseInt(trashElement.parentElement.parentElement.id) //trash and section can grab the section ID
    report.sections=report.sections.filter((section) => { //each section object we have that has ID
      return section.id !== sectionId
    })
    trashElement.parentElement.parentElement.remove() //function that doesnt take in any parameters; this removes section from the page
  })
})
document.getElementById('addSectionTitle').addEventListener('click',() => {
  addNewSection('title')
})
document.getElementById('addSectionBody').addEventListener('click',() => {
  addNewSection('body')
})
document.getElementById('saveReport').addEventListener('click', () =>{
  const serializer = new XMLSerializer();
  const svg = serializer.serializeToString(document.getElementById('ketcher-frame').contentWindow.document.getElementById("canvas").childNodes[0]);
// now you can use svg to save to the database as rxnImg
  const section = {position: report.sections.length, id:report.nextId, text: "", type: 'img', rxnImg: svg}
  report.nextId+=1
  report.sections.push(section)
  console.log(JSON.stringify(report))
  //doing a fetch thats NOT a get, set a content type
  fetch(`/report`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(report)
  }).then((response)=>{
    // alert("Report Saved!")
    window.location.reload()
  })
  .catch((e)=>{
    // alert("Error!")
    console.log(e)
  })
})

document.getElementById('addReactionImage').addEventListener('click',() => {
  document.getElementById('moleculeBoard').style.display = 'inline-block'
})
