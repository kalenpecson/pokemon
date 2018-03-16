$(document).ready(function(){
    $("#info").hide();
    $("#more").hide();
    $("p").hide();
    $("#search").on("click",function(){
        var name= $("#name").val();
        $.ajax({
            url: "https://api.pokemontcg.io/v1/cards?name="+name,
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                myFunction(result) },
            error: function() {
                alert('Failed!');
            }
        });
    });
    $("img").on("mouseover",function() {
        $(this).animate({"bottom":"20px"}, 300);
    });
    $("img").on("mouseleave",function() {
        $(this).animate({"bottom":"0"}, 300);
    });
    $("#cancel").on("click",function(){
        $("#info").hide();
    });
    $("img").on("click",function(){
        $("#aspects").empty();
        $("img").removeClass("sticker");
        $(this).addClass("sticker");
        var imgobj=$(this).data();
        console.log(imgobj);
        var name=imgobj.name;
        $("h2").text(name);
        var pic=imgobj.imageUrl;
        $("#info").show().val("");
        $("#demo").attr("src",pic);
        for(key in imgobj){
                if(keystouse.indexOf(key)!=-1){
                    var a = imgobj[key];
                    if(key == "weaknesses"|| key=="resistances"){
                        a= a[0].type +" "+ a[0].value;
                    }
                    var b= keystouse.indexOf(key);
                    document.getElementById("aspects").innerHTML+="<tr><td>"+aspectarray[b]+"</td><td>"+a+"</td></tr>"
            }
        }
    });
    $("#registered").on("click",function(){
        arraytoimage(selectedimages);
    })
});
var aspectarray=["Rarity","HP","National Pokedex Number","Type","Weaknesses","Resistances"];
var keystouse=["rarity","hp","nationalPokedexNumber","types","weaknesses","resistances"];
function save(){
    var imagelink= $(".sticker").attr("src");
    selectedimages.push(imagelink);
    $(".sticker").removeClass("sticker");
    $("#info").hide();
}

var selectedimages=[];
var emptyarray=[];
function arraytoimage(array){
    $("p").show().text("Page 1/1");
    var picture="";
    for(var i=0;i<50;i++){
        picture=array[i];
        $("#img"+(i+1)).attr('src',"").attr('src',picture);
    }
}
function myFunction(result){
    arraytoimage(emptyarray);
    var picture="";
    var amount= result.cards.length;
    $("p").show();
    if(amount<50){
        $("#more").hide();
        $("p").text("Page 1/1");
        for (var i=0; i<50; i++){
            picture= result.cards[i].imageUrl;
            $("#img"+(i+1)).attr("src","").attr('src',picture).data(result.cards[i]);
        }
    }
    if(amount>50){
        $("p").text("Page 1/2");
        for (var i=0; i<50; i++){
            picture= result.cards[i].imageUrl;
            $("#img"+(i+1)).attr("src","").attr('src',picture).data(result.cards[i]);
        }
        $("#more").show();
        $("p").show();
        $("#more").on("click", function(){
            $("p").text("Page 2/2");
            arraytoimage(emptyarray);
            for(var i=0;i<50;i++){
                picture= result.cards[50+i].imageUrl;
                $("#img"+(i+1)).attr('src',picture).data(result.cards[i+50]);
            }
        })
    }
}