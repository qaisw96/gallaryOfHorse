'use strict';

const hornsObjectsTwo = []; 
let page = "";

// Constractor function

function Horns(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.image_description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;

    Horns.all.push(this)
}
 Horns.all = [];



// render function


Horns.prototype.render = function() {
    $("#mastachsec").hide()
    $("#select2").hide()


    let titleEl = $('<h1></h1>').text(`${this.title}     #${this.horns}`)
    let imageEl = $(`<img src="" alt="">`).attr({'src': this.image_url, "width": "200px", "height": "200px"})
    let descEl = $('<p></p>').text(this.image_description)

   
    let divEl = $('<div></div>').append(titleEl, imageEl, descEl )
    let sec = $("#sec1").append(divEl)
    $("main").append(sec)
    
}


// ajax 

const ajaxSetiings = {
    method: "get",
    dataType: "json"
};

let arrOptions = [];

$.ajax("data/page-1.json", ajaxSetiings).then((data) => {
    data.forEach(element => {
        let hornObject = new Horns(element)
        hornObject.render()

    });
    
    for (let i=0; i<data.length; i++) {
        arrOptions.push(data[i].keyword)
    }
    let unique = arrOptions.filter(function(itm, i, a) {
        return i == arrOptions.indexOf(itm);
    });
    for (let i=0; i<unique.length; i++) {
        var options = $(`<option value=""></option>`).text(unique[i])
        $(`#select`).append(options)

        
    }

    
})


// filter the results 

$("#select").on("change", function(event) {
    
    var conceptName = $('#select').find(":selected").text();
    
    $("#sec1").css("display", "none")
   
    
        
        var pusharr = []
        $("#sec2").html("") 
        rendeFilterTwoPages(conceptName, pusharr )
        
    })
    
function rendeFilterTwoPages(conceptName, pusharr ) {

    for(let i=0; i<Horns.all.length; i++) { 
        
        if (Horns.all[i].keyword === conceptName) {
            let titleEl = $('<h1></h1>').text(`${Horns.all[i].title}     #${Horns.all[i].horns}`)
            let imageEl = $(`<img src="" alt="">`).attr({'src': Horns.all[i].image_url, "width": "280px", "height": "280px"})
            let descEl = $('<p></p>').text(Horns.all[i].image_description)
            
            let divEl = $('<div></div>').append(titleEl, imageEl, descEl )
            let sec = $("#sec2").append(divEl)
            $("main").append(sec)            
            pusharr.push(Horns.all[i])
            
        }
        
        
        
    }
}



/*--------------------lab03 ---------*/

  





let arrOptions2 = [];

$("#render").on("click", function() {
    $("#sec2").hide()
    $("#sec1").hide()
    $(".selection").hide()
    $("#mastachsec").show()
    $("#select2").show()

    page = "page2"


})

$("#select2").on("change", function(event) {
    page = 2
    var conceptName2 = $('#select2').find(":selected").text();
    console.log(conceptName2)
    
    $("#sec1").css("display", "none")
   
    
        
    var arrOptions2 = []
    console.log(arrOptions2)
/*     $("#mastachsec").html("") 
 */    rendeFilterTwoPages(conceptName2, arrOptions2 )

 arrOptions2.forEach((element)=>{
     if (this.value === element.keyword){
        console.log(element.keyword)

          $(`.${element.keyword}`).show();
        }else if (element.keyword !== this.value){
          $(`.${element.keyword}`).hide();
        } else {
          $(`.${element.keyword}`).show();
        }
      });
  
        
    })








const ajaxSetiings1 = {
    method: "get",
    dataType: "json"
};


$.ajax("data/page-2.json", ajaxSetiings1).then((data) => {
    data.forEach(element => {
        hornsObjectsTwo.push(new Horns(element))


    });
    hornsObjectsTwo.forEach((objectTwo) => {
        objectTwo.renderWithMustache();
    });
    
    for (let i=0; i<data.length; i++) {
        arrOptions2.push(data[i].keyword)
    }
    let unique = arrOptions2.filter(function(itm, i, a) {
        return i == arrOptions2.indexOf(itm);
    });
    for (let i=0; i<unique.length; i++) {
        var options = $(`<option value=""></option>`).text(unique[i])
        $(`#select2`).append(options)
        $(options).addClass("")

        
    }


 
    
})




Horns.prototype.renderWithMustache = function() {
    let tamplete = $("#horn-template").html()
    let templetClone=$('#horn-template').clone();

    let html = Mustache.render(tamplete, this);

    $("#mastachsec").append(html);

    templetClone.attr('class',this.keyword);


}



let sortByTitle = () =>{
    if(page ==="page1"){
        Horns.all.sort(function (a,b){
        if (a.title > b.title) return 1;
        if (b.title > a.title) return -1;
        return 0;
      });
      $('#sec1').html('');
      Horns.all.forEach(function(value){
        value.render();
      });
    }



    if(page==='page2'){
        console.log(page)

      Horns.all.sort(function (a,b){
        if (a.title > b.title) return 1;
        if (b.title > a.title) return -1;
        return 0;
      });
      $('#sec1').html('');
      Horns.all.forEach(function(value){
        value.render();
      });
    }
  }
  
  





$("#sort2").change(function() {
    
    sortByTitle()
})















// Constractor function

/*function Horns(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.image_description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;

    Horns.all.push(this)
}
 Horns.all = [];
 console.log(Horns.all)

// render function

Horns.prototype.render = function() {

    
    let titleEl = $('<h1></h1>').text(`${this.title}     #${this.horns}`)
    let imageEl = $(`<img src="" alt="">`).attr({'src': this.image_url, "width": "200px", "height": "200px"})
    let descEl = $('<p></p>').text(this.image_description)

   
    let divEl = $('<div></div>').append(titleEl, imageEl, descEl )
    divEl.attr("class", "${this.keyword}" )
    let sec = $("#sec1").append(divEl)
    $("main").append(sec)


}


// ajax 

const ajaxSetiings = {
    method: "get",
    dataType: "json"
};

let arrOptions = [];

$.ajax("/data/page-1.json", ajaxSetiings).then((data) => {
    data.forEach(element => {
        let hornObject = new Horns(element)
        hornObject.render()

    });
    
    for (let i=0; i<data.length; i++) {
        arrOptions.push(data[i].keyword)
    }
    let unique = arrOptions.filter(function(itm, i, a) {
        return i == arrOptions.indexOf(itm);
    });
    for (let i=0; i<unique.length; i++) {
        let options = $(`<option value=""></option>`).text(unique[i])
        options.attr("value", unique[i])
        $(`#select`).append(options)

        
    }

    
    console.log(unique)
})


// filter the results 

$("#select").on("change", function(event) {
    let selectedKey = $(this).val()

/*     console.log(selectedKey)
 */
    /*if (selectedKey !== "select") {

        renderFilter(selectedKey)
    }
    
})

function renderFilter(selectedKey) {
    $("#sec1").hide()
    
    Horns.all.forEach((horn) => {
        if (horn.keyword === selectedKey) {
            $(`.${selectedKey}`).show()
            console.log(selectedKey)
        } else {
            $(`.${horn.keyword}`).hide()

        }


    })
}
/* function remitem() {
    
    var pusharr = []
    for(let i=0; i<Horns.all.length; i++) { 
        
        if (Horns.all[i].keyword === conceptName) {
            let titleEl = $('<h1></h1>').text(`${Horns.all[i].title}     #${Horns.all[i].horns}`)
            let imageEl = $(`<img src="" alt="">`).attr({'src': Horns.all[i].image_url, "width": "200px", "height": "200px"})
            let descEl = $('<p></p>').text(Horns.all[i].image_description)
            
            let divEl = $('<div></div>').append(titleEl, imageEl, descEl )
            let sec = $("#sec2").append(divEl)
            $("main").append(sec)            
            pusharr.push(Horns.all[i])
            
        }
        
        
        
    }
    console.log(pusharr)
    
}
 */