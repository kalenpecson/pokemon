$(document).ready(function(){
    $("#battlefield").hide();
    $("#mask").show();
    $("#info").hide();
    $("#more").hide();
    $("#less").hide();
    $("#battle").hide();
    $("#save").on("click", function () {
        $("#registered").show();
    });
    $("#registered").hide();
    $("p").hide();




    $("#name").keyup(function(e){
        var code= e.which;
        if(code==13){
            var name= $("#name").val();
            $(".battle").removeClass("battle").addClass("animate");
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
        }
    });



    $('#newdeck').click(function() {
        $("#pop").fadeIn('slow');
        $("#mask").fadeIn('slow');
        $.post("contentPopup.html", function(data) {
            $("#contentPop").html(data);
        });
    });
    $("#mask").hide();
    $("#pop").hide();
    var img_w = 600;
    var img_h = 300;
    $("#pop").css('width', img_w + 'px');
    $("#pop").css('height', img_h + 'px');
    var w = $(this).width();
    var h = $(this).height();
    w = (w / 2) - (img_w / 2);
    h = (h / 2) - (img_h / 2);
    $("#pop").css("left", w + "px");
    $("#pop").css("top", h + "px");

    $(".close").click(function() {
        $("#pop").fadeOut('slow');
        $("#mask").fadeOut('slow');
    });



    $("#battle").on("click",function(){
        $(".animate").removeClass("animate").addClass("battle");
        alert("Select Two Pokemon Cards!");
    });



    $("document").on("click",".battle",function(){
        var pokedata=$(this).data();
        var pokenumber= pokedata.nationalPokedexNumber;
        var pokeurl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokenumber+".png";
        var urlarray=[];
        urlarray.push(pokeurl);
        if(urlarray.length==2){
            $("#battlefield").show();
        }
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




    $(".animate").on("click",function(){
        if($(this).hasClass("battle")){

        }else{
            $("#save").show();
            $("#aspects").empty();
            $(".animate").removeClass("sticker");
            $(this).addClass("sticker");
            var imgobj=$(this).data();
            console.log(imgobj);
            var name=imgobj.name;
            $("#Names").text(name);
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
        }
    });




    $("#registered").on("click",function(){
        $("#more").hide();
        $("#less").hide();
        $("#battle ").show();
        arraytoimage(selectedimages);
    })
});



var aspectarray=["Rarity","HP","National Pokedex Number","Type","Weaknesses","Resistances"];
var keystouse=["rarity","hp","nationalPokedexNumber","types","weaknesses","resistances"];



function save(){
    var imagelink= $(".sticker").attr("src");
    var imagedata= $(".sticker").data();
    selectedimages.push(imagelink);
    selectedimagesdata.push(imagedata);
    $(".sticker").removeClass("sticker");
    $("#info").hide();
}

var selectedimages=[];
var selectedimagesdata=[];
var emptyarray=[];
var decks=[];




function arraytoimage(array){
    $("p").show().text("Page 1/1");
    var picture="";
    for(var i=0;i<50;i++){
        picture=array[i];
        $("#img"+(i+1)).attr('src',"").attr('src',picture).data(selectedimagesdata[i]);
    }
}




function makedeck(){
    var name= $("#deckname").val();
    var creator= $("#creator").val();
    var deck=[name,creator];
    decks.push(deck);
    console.log(decks);
    $(".dropdown-content").append("<div id='"+name+"'>"+name+" by "+creator+"</div>");
}






function myFunction(result){
    $("#battle ").hide();
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
            $(this).hide();
            arraytoimage(emptyarray);
            $("p").text("Page 2/2");
            for(var i=0;i<50;i++){
                picture= result.cards[50+i].imageUrl;
                $("#img"+(i+1)).attr('src',picture).data(result.cards[i+50]);
                $("#less").show();
            }
        });
        $("#less").on("click",function (){
            $("#more").show();
            $(this).hide();
            $("p").text("Page 1/2");
            for (var i=0; i<50; i++){
                picture= result.cards[i].imageUrl;
                $("#img"+(i+1)).attr("src","").attr('src',picture).data(result.cards[i]);
            }
        })
    }
}