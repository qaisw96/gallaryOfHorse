'use strict';



'use strict';

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
 console.log(Horns.all)



// render function


Horns.prototype.render = function() {

    
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
    var unique = arrOptions.filter(function(itm, i, a) {
        return i == arrOptions.indexOf(itm);
    });
    for (let i=0; i<unique.length; i++) {
        var options = $(`<option value=""></option>`).text(unique[i])
        $(`#select`).append(options)

        
    }

    
    console.log(unique)
})


// filter the results 

$("#select").on("change", function(event) {
    
    var conceptName = $('#select').find(":selected").text();
    console.log(conceptName)
    
    $("#sec1").css("display", "none")
   
    
        
        var pusharr = []
        $("#sec2").html("") 
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