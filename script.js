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
    $("img").on("click",function(){
        $("img").removeClass("sticker");
        $(this).addClass("sticker");
        // var imgobj=$(this).data();
        // console.log(imgobj);
        // var name= imgobj.name;
        // console.log(imgobj.name);
        // var types= imgobj.types;
        // var rare= imgobj.rarity;
        // console.log(name);
        // var pic=imgobj.imageUrl;
        // $("#info").show().text("").children("#save").remove();
        // $("#demo").attr("src",pic);
        // document.getElementById ("info").innerHTML+= name+"<br>"+rare +"<br> <button id='save' onclick='save()'>Save</button>";
        //



        ADD TABLE



    });
    $("#registered").on("click",function(){
        arraytoimage(selectedimages);
    })
});

function save(){
    var imagelink= $(".sticker").attr("src");
    selectedimages.push(imagelink);
    $(".sticker").removeClass("sticker");
    $("#info").hide();
}

var selectedimages=[];
var emptyarray=[];
function arraytoimage(array){
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