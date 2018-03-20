


$(document).ready(function(){
    $("#fight").hide();
    $("#battlefield").hide();
    $("#info").hide();
    $("#more").hide();
    $("#less").hide();
    $("#battle").hide();
    $("#selections").hide();
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
        urlarray=[];
        fightingimages=[];
        names=[];
        alert("Select Your Pokemon Card!");
        $("#fight").show();
    });

    var urlarray=[];
    var fightingimages=[];
    var names=[];
    var hps=[];
    var moves=[];
    var respectivedam=[];
    var x=[];

    $("#fight").on("click",function(){

        $("#info").hide();
        var pokedata=$(this).parent().parent().data();
        if(pokedata.supertype!="Pokémon"){
            alert("Not a Pokémon")
        }else{
            if(pokedata.attacks[0].damage==""){
                var rand= Math.floor((Math.random() * 100) + 1);
                respectivedam.push(rand);
            }else {
                var damage= parseInt(pokedata.attacks[0].damage);
                respectivedam.push(damage);
            }

            fightingimages.push(pokedata.imageUrl);
            moves.push(pokedata.attacks[0].name);
            names.push(pokedata.name);

            if(pokedata.attacks.length==2){
                if(pokedata.attacks[1].damage==""){
                    var rand= Math.floor((Math.random() * 100) + 1);
                    respectivedam.push(rand);
                }else {
                    var damage= parseInt(pokedata.attacks[1].damage);
                    respectivedam.push(damage);
                }
                moves.push(pokedata.attacks[1].name);
           }else{
                respectivedam.push("0");
                moves.push("N/A");
            }

            $("#firstmove").data([moves[0],respectivedam[0]]).text(moves[0]);
            $("#secondmove").data([moves[1],respectivedam[1]]).text(moves[1]);
            hps.push(pokedata.hp);
            x.push(pokedata.hp);
            var pokenumber= pokedata.nationalPokedexNumber;
            var attacks=pokedata.attacks;
            var health=parseInt(pokedata.hp);
            var pokeurl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokenumber+".png";
            urlarray.push(pokeurl);
            if(urlarray.length==1){
                alert("Select Opponent");
            }
            if(urlarray.length==2){
                $("#mask").fadeIn('slow');
                $("#battlefield").show();
                $("#narration").text("A wild "+names[1]+" has appeared!").delay(3000).text("What will "+names[0]+" do?");
                $("#firstpokemon").attr("src",fightingimages[0]).delay(800).fadeOut("slow");
                $("#secondpokemon").attr("src",fightingimages[1]).delay(800).fadeOut("slow");
                $("#firstpokemon").attr("src",urlarray[0]).fadeIn("slow");
                $("#secondpokemon").attr("src",urlarray[1]).fadeIn("slow");
                document.getElementById("battlemusic").play();
                $("#selections").show();
                $("#firstname").text(names[0]);
                $("#secondname").text(names[1]);
                document.getElementById("firsthp").innerHTML+=hps[0]+"/"+hps[0]+"<div id='firstblue'></div><div id='firstwhite'></div>";
                document.getElementById("secondhp").innerHTML+=hps[1]+"/"+hps[1]+"<div id='secondblue'></div><div id='secondwhite'></div>";
            }
        }
    });

        $(".move").on("click",function () {
            var stuffarray= $(this).data();
            var d= x[1];
            var e= hps[1];
            console.log(d);
            var a= stuffarray[0];
            var b= stuffarray[1];
            var c= $("#secondblue").width();
            c= parseInt(c);
            console.log(b);
            console.log(c);
            var newwidth= (d-b)*(200/e);
            console.log(newwidth);
            if(newwidth>=1){
                $("#secondblue").css("width", newwidth+"px");
            }else{
                $("#secondblue").css({"width": "0px"},"slow");
                $("#narration").text("Wild " +names[1]+" fainted!");
                document.getElementById("battlemusic").pause();
                $("#soundeffects").attr("src","http://66.90.93.122/ost/pokemon-gameboy-sound-collection/kccmwnxi/108-victory%20%28vs%20wild%20pokemon%29.mp3");
                document.getElementById("battlemusic").load();
                document.getElementById("battlemusic").play();
            }

            x[1]=d-b;
            var which=Math.floor((Math.random() * 2) + 2);
            if(which==3 && respectivedam[3]=="0"){
                which=2;
            }
            var f= x[0];
            var w= hps[0];
            console.log(d);
            var q= moves[which];
            var z= respectivedam[which];
            var r= $("#firstblue").width();
            r= parseInt(r);
            var newwidth= (f-z)*(200/w);
            console.log(newwidth);
            if(newwidth>=1){
                $("#firstblue").css("width", newwidth+"px");
            }else{
                $("#firstblue").css({"width": "0px"},"slow");
                // $("#narration").text("Wild " +names[1]+" fainted!");
                // document.getElementById("battlemusic").pause();
                // $("#soundeffects").attr("src","http://66.90.93.122/ost/pokemon-gameboy-sound-collection/kccmwnxi/108-victory%20%28vs%20wild%20pokemon%29.mp3");
                // document.getElementById("battlemusic").load();
                // document.getElementById("battlemusic").play();
            }

            x[0]=f-z;
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
            $("#save").show();
            $("#aspects").empty();
            $(".animate").removeClass("sticker");
            $(this).addClass("sticker");
            var imgobj=$(this).data();
            console.log(imgobj);
            var name=imgobj.name;
            $("#Names").text(name);
            var pic=imgobj.imageUrl;
            $("#info").show().val("").data(imgobj);
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