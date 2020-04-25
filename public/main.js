var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const labTitle = this.parentNode.parentNode.childNodes[3].innerText
        console.log(labTitle, name)
        fetch('report', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // 'name': name,
            // 'labTitle': labTitle
            'id': this.id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
