$(function () {
    loadStock();
});

function loadStock(){
    $.ajax({
        type: "GET",
        dataType:"json",
        cahce: false,
        url:"/stock"
    }).done(function (data, textStatus, jqXHR){
        console.log("el resultado es: \n" + data[0].code );

        $("#body-stock").html("");
        $.each(data, function (ind, elem) {
            $("<tr>"+
              "<td>"+elem.code+"</td>"+
              "<td>"+elem.model+"</td>"+
              "<td>"+elem.brand+"</td>"+
              "<td>"+elem.type+"</td>"+
              "<td>"+elem.category+"</td>"+
              "<td>"+elem.autoCategory+"</td>"+
              "<td>"+elem.quantity+"</td>"+
            "</tr>").appendTo($("#body-stock"));
        });

    }).fail(function (jqXHR, textStatus, textError){

        console.log("Error");

    });
}