var ketcher;
const ketcherFrame = document.getElementById("ketcher-frame"); // line 46 ID -- talk to ketcheeer. talk to ketcher frame ewith the ID
console.log("ketcherFrame:", ketcherFrame);
ketcherFrame.addEventListener('load', function () { // waiting for the browser to load HTML; so its waiting for the second html page to load
  ketcher = this.contentWindow.ketcher; //ketcher is equal to ketcher object inside that iframe
  // ketcher.setMolecule(initialMolecule);
  // if (lab.molfile){
  //   ketcher.setMolecule(lab.molfile)
  // }
  // console.log(lab)
});

const saveButton = document.getElementById("saveMolecule");
saveButton.addEventListener('click', function(){
  const molfile = ketcher.getMolfile();
  console.log(molfile)
  // const id = report._id;
  // console.log(lab)
  // fetch('/lab', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     'molfile': molfile,
  //     'name': lab.name,
  //     'msg': lab.msg
  //   })
  // })
});
