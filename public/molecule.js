// const initialMolecule = "<%= lab.molecule =>"   this is how you will pass th emolecule the database to the server to ketcher
         var initialMolecule = [
        "",
        "  Ketcher 02151213522D 1   1.00000     0.00000     0",
        "",
        "  6  6  0     0  0            999 V2000",
        "   -1.1750    1.7500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0",
        "   -0.3090    1.2500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0",
        "   -0.3090    0.2500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0",
        "   -1.1750   -0.2500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0",
        "   -2.0410    0.2500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0",
        "   -2.0410    1.2500    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0",
        "  1  2  1  0     0  0",
        "  2  3  2  0     0  0",
        "  3  4  1  0     0  0",
        "  4  5  2  0     0  0",
        "  5  6  1  0     0  0",
        "  6  1  2  0     0  0",
        "M  END"
      ].join("\n"); // one big single string, store it as a single string in mongo db
    const ketcherFrame = document.getElementById("ketcher-frame"); // line 46 ID -- talk to ketcheeer. talk to ketcher frame ewith the ID
    console.log("ketcherFrame:", ketcherFrame);
    ketcherFrame.addEventListener('load', function () { // waiting for the browser to load HTML; so its waiting for the second html page to load
      const ketcher = this.contentWindow.ketcher; //ketcher is equal to ketcher object inside that iframe
      ketcher.setMolecule(initialMolecule);
      const getButton = document.getElementById("getMolecule")
      getButton.addEventListener("click",
        function (){
          const molecule = ketcher.getSmiles()
          console.log(molecule)
        }
    )
    });
