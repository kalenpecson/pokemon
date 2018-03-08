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
        var imgobj=$(this).data();
        var name= imgobj.name;
        console.log(name);
        $("#info").show().text(name);
            var imagelink= $(this).attr("src");
            selectedimages.push(imagelink);
    });
    $("#registered").on("click",function(){
        arraytoimage(selectedimages);
    })
});

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
        for (var i=0; i<50; i++){
            picture= result.cards[i].imageUrl;
            $("#img"+(i+1)).attr("src","").attr('src',picture).data(result.cards[i]);
        }
        $("#more").show();
        $("p").show();
        $("#more").on("click", function(){
            $("p").text("Page 2/2");
            for(var i=0;i<50;i++){
                picture= result.cards[50+i].imageUrl;
                $("#img"+(i+1)).attr('src',picture).data(result.cards[i+50]);
            }
        })
    }
    console.log($("#img1").data())
}