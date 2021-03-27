'use strict';

let arrDataForAll = []; 
let keyWordOptions = [];

// Constractor function
function Horns(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.image_description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;

}

// Get the data from JSON files by AJAX
const ajaxSetiings = {
    method: "get",
    dataType: "json"
};
function getDataFromAjax(pageDataNumber) {
    arrDataForAll = []

    $.ajax(`data/page-${pageDataNumber}.json`, ajaxSetiings).then((data) => {
        
        data.forEach(element => {
            arrDataForAll.push(new Horns(element))
        });
        console.log(arrDataForAll.length)
        arrDataForAll.forEach((hornObj) => {
            if(!keyWordOptions.includes(hornObj.keyword)) {
                keyWordOptions.push(hornObj.keyword)
                $("#select").append( $(`<option value="${hornObj.keyword}" >${hornObj.keyword}</option>`))
            }
            if(pageDataNumber === 1) {
                hornObj.render()          
            }else {
                hornObj.renderWithMustache()
            }        
        })
  })   
}

// Render by jQuery
Horns.prototype.render = function() {

    let titleEl = $('<h1></h1>').text(`${this.title}    #${this.horns}`)
    let imageEl = $(`<img src="" alt="">`).attr({'src': this.image_url, "width": "200px", "height": "200px"})
    let descEl = $('<p></p>').text(this.image_description)

    let divEl = $('<div></div>').append(titleEl, imageEl, descEl )
    divEl.attr("class", `${this.keyword}`)
    let sec = $("#sec1").append(divEl)
    $("main").append(sec)
    
}

// Render by Mustache
Horns.prototype.renderWithMustache = function() {
   
     
    let tamplete = $("#horn-template").html()
    let templetClone=$('#horn-template').clone();
    
    let html = Mustache.render(tamplete, this);
    
    $("#mastachsec").append(html);
    
    templetClone.attr('class',this.keyword);

}

// Display page Two
$("#part-two").on("click", function(event) {
    $("#mastachsec").css("display", "flex")
    event.preventDefault()
    $("#mastachsec").html("")
    getDataFromAjax(2)
   $("#sec1").html("") 

})

$("#part-one").on("click", function() {
    $("#mastachsec").css("display", "none")
    $("#sec1").html("")
    getDataFromAjax(1)

})

// filter the results 
$('#select').change(function() {
    console.log(this.value);
    arrDataForAll.forEach((element)=>{
      console.log(element.keyword);
      if (this.value === element.keyword){
        $(`.${element.keyword}`).show();
      }else if (element.keyword !== this.value){
        $(`.${element.keyword}`).hide();
      } else {
        $(`.${element.keyword}`).show();
      }
    });
  });
  


/*-------------------------------SoOoOort ------------------------------------*/

// Sort by Title 
$("#sort1").on("click", function(event) {
    event.preventDefault()
    
    $("#sort2").html("")
    $("#sec1").html("")
    $("#mastachsec").html("")
     
    arrDataForAll.sort(function(a, b){
       if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
       if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
       return 0;
    })
    arrDataForAll.forEach((element) => {
        element.render()
    })    
})

// Sort bt Horns Number
$("#sort2").on("click", function(event) {
    event.preventDefault()

    $("#sec1").html("")
    $("#mastachsec").html("")
    $("#sort1").html("") 
    arrDataForAll.sort(function(a, b){return a.horns - b.horns});
    arrDataForAll.forEach((element) => {
        element.render()
    })
    
})

// Call the functions
getDataFromAjax(1)
