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
                "<button type=\"button\" class=\"btn btn-outline-success btn-sm mr-1\" onclick=\"openAddProduct(" + elem.id + ");\">Add</button>" +
                "<button type=\"button\" class=\"btn btn-outline-danger btn-sm mr-1\" onclick=\"openRemoveProduct(" + elem.id + ");\">Ship</button>" +
                "<button type=\"button\" class=\"btn btn-outline-info btn-sm\" onclick=\"openEditProduct(" + elem.id + ");\">Edit</button>" +
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
    $("#check-container").css('display', 'inline');
    $("#modal-product").modal();
    $("#btn-save").attr("onclick","saveProduct()");
}

function saveProduct(){
    var data = {
        code:$("#code").val(),
        model:$("#model").val(),
        brand:$("#brand").val(),
        type:$("#type").val(),
        category:$("#category").val(),
        autoCategory:$("#auto").val(),
        quantity:$("#quantity").val()
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

        $("#modal-product").modal('hide');
        loadStock();

    }).fail(function (jqXHR, textStatus, textError){
        console.log("Error");
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );
        console.log("el textError es: \n" + textError );
    });
}

function openEditProduct(id){
    console.log("Value: " + $("#row-"+id).find('td').eq(0).html());
    var code = $("#row-"+id).find('td').eq(0).html();
    var model = $("#row-"+id).find('td').eq(1).html();
    var brand = $("#row-"+id).find('td').eq(2).html();
    var type = $("#row-"+id).find('td').eq(3).html();
    var category = $("#row-"+id).find('td').eq(4).html();
    var autoCategory = $("#row-"+id).find('td').eq(5).html();
    var quantity = parseInt($("#row-"+id).find('td').eq(6).html());

    $("#code").val(code);
    $("#model").val(model);
    $("#brand").val(brand);
    $("#type").val(type);
    $("#category").val(category);
    $("#auto").val(autoCategory);
    $("#quantity").val(quantity);

    $("#check-container").css('display', 'none');

    $("#modal-product").modal();
    $("#btn-save").attr("onclick","updateProduct("+id+")");
}

function updateProduct(id){
    var data = {
        code:$("#code").val(),
        model:$("#model").val(),
        brand:$("#brand").val(),
        type:$("#type").val(),
        category:$("#category").val(),
        autoCategory:$("#auto").val(),
        quantity:$("#quantity").val()
    }

    $.ajax({
        data: JSON.stringify(data),
        type: "PUT",
        dataType:"json",
        cahce: false,
        url:"/stock/"+id+"/",
        contentType: 'application/json; charset=utf-8',
    }).done(function (data, textStatus, jqXHR){
        console.log("el data es: \n" + data );
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );
        $("#modal-product").modal('hide');
        loadStock();

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