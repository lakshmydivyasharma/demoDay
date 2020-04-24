
const tags = {title: 'h2', body: 'p'}
function toTitleCase(word){
  return word.slice(0,1).toUpperCase()+word.slice(1) //just get the first charracter, then the rest of it is saying get the rest  of the word
}

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

function addNewImage (molfile) { //this function adds a new section
  const sections = document.getElementById('sections')
  const div = document.createElement('div')
  div.className = 'section'
  const sectionElement = document.createElement(tags['svg']) // need to provide tag, so we are using tags as a look up in tags the kind of element that we want for this section type
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
  const section = {position: report.sections.length, id:report.nextId, text: molfile, type: type}
  report.nextId+=1
  report.sections.push(section)
  // sectionElement.addEventListener("blur",() =>{
  //   section.text = sectionElement.innerText
  //   console.log(sectionElement.innerText)
  // })
}


document.querySelectorAll('.sectionText').forEach((sectionElement) => {
  let relevantSection = null
  const sectionId = parseInt(sectionElement.parentElement.id)
  for(const section of report.sections){
  if(section.id === sectionId){
    relevantSection = section
    break //found what we are looking for in the loop so we dont need to keep going in the loop
  }
  }
  sectionElement.addEventListener("blur",() =>{
    relevantSection.text = sectionElement.innerText
    console.log(sectionElement.innerText)
  })
})

//save button is what does the full update
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
  console.log(JSON.stringify(report))
  fetch(`/report`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
         },
    body: JSON.stringify(report)}).then((response)=>{
    alert("Report Saved!")
  })
  .catch((e)=>{
    alert("Error!")
    console.log(e)
  })
})

document.getElementById('addReactionImage').addEventListener('click',() => {
  document.getElementById('moleculeBoard').style.display = 'inline-block'
})
