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

        $("#body-stock").html("");
        $.each(data, function (ind, elem) {
            $("<tr id=\"row-" + elem.id + "\">"+
              "<td>" + elem.code + "</td>"+
              "<td>" + elem.model + "</td>"+
              "<td>" + elem.brand + "</td>"+
              "<td>" + elem.type + "</td>"+
              "<td>" + elem.category + "</td>"+
              "<td>" + elem.autoCategory + "</td>"+
              "<td>" + elem.quantity + "</td>"+
              "<td>" +
                "<button type=\"button\" class=\"btn btn-outline-success btn-sm\" onclick=\"openAddProduct(" + elem.id + ");\">Add</button>" +
                "<button type=\"button\" class=\"btn btn-outline-danger btn-sm\" onclick=\"openRemoveProduct(" + elem.id + ");\">Ship</button>" +
              "</td>"+
            "</tr>").appendTo($("#body-stock"));
        });

    }).fail(function (jqXHR, textStatus, textError){

        console.log("Error");

    });
}

function validateEntry(e){
    if (e.key.length === 1) { // Evaluar si es un solo caracter
        if (!isNaN(parseFloat(e.key))) {
          return true;
        }else{
          return false;
        }
    }
}

function openNewProduct(){
    //console.log("Value: " + $("#row-"+id).find('td').eq(0).html());
    //var code = $("#row-"+id).find('td').eq(0).html();
    //var currentQty = parseInt($("#row-"+id).find('td').eq(6).html());
    //var addQty = 0;
    //
    //$("#add-code").val(code);
    //$("#add-current").val(currentQty);

    $("#modal-new").modal();
}

function saveProduct(){
    var data = {
        code:$("#new-code").val(),
        model:$("#new-model").val(),
        brand:$("#new-brand").val(),
        type:$("#new-type").val(),
        category:$("#new-category").val(),
        autoCategory:$("#new-auto").val(),
        quantity:$("#new-quantity").val()
    }

    $.ajax({
        data: JSON.stringify(data),
        type: "POST",
        dataType:"json",
        cahce: false,
        url:"/stock/",
        contentType: 'application/json; charset=utf-8',
    }).done(function (data, textStatus, jqXHR){
        console.log("el data es: \n" + data );
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );

    }).fail(function (jqXHR, textStatus, textError){
        console.log("Error");
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );
        console.log("el textError es: \n" + textError );
    });



}

function generateCode(){

}

function openAddProduct(id){
    console.log("Value: " + $("#row-"+id).find('td').eq(0).html());
    var code = $("#row-"+id).find('td').eq(0).html();
    var currentQty = parseInt($("#row-"+id).find('td').eq(6).html());
    var addQty = 0;

    $("#add-code").val(code);
    $("#add-current").val(currentQty);

    $("#modal-add").modal();
}

function addProduct(){


}