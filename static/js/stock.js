$(function () {
    loadStock();
    loadShipments();
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
                "<button type=\"button\" class=\"btn btn-outline-danger btn-sm mr-1\" onclick=\"openShipProduct(" + elem.id + ");\">Ship</button>" +
                "<button type=\"button\" class=\"btn btn-outline-info btn-sm\" onclick=\"openEditProduct(" + elem.id + ");\">Edit</button>" +
              "</td>"+
            "</tr>").appendTo($("#body-stock"));
        });

    }).fail(function (jqXHR, textStatus, textError){

        console.log("Error in loadStock");
        alertify.alert("An error has occurred.");

    });
}

function loadShipments(){
    $.ajax({
        type: "GET",
        dataType:"json",
        cahce: false,
        url:"/shipment/"
    }).done(function (data, textStatus, jqXHR){

        $("#body-shipments").html("");
        $.each(data, function (ind, elem) {
            $("<tr>"+
              "<td>" + elem.product + "</td>"+
              "<td>" + elem.quantity + "</td>"+
              "<td>" + elem.name + "</td>"+
              "<td>" + elem.company + "</td>"+
              "<td>" + elem.address + "</td>"+
            "</tr>").appendTo($("#body-shipments"));
        });

    }).fail(function (jqXHR, textStatus, textError){

        console.log("Error in loadShipments");
        alertify.alert("An error has occurred.");

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

function cleanProduct(){
    $("#code").val('');
    $("#model").val('');
    $("#brand").val('');
    $("#type").val('');
    $("#category").val('');
    $("#auto").val('');
    $("#quantity").val('');
}

function openNewProduct(){
    //console.log("Value: " + $("#row-"+id).find('td').eq(0).html());
    //var code = $("#row-"+id).find('td').eq(0).html();
    //var currentQty = parseInt($("#row-"+id).find('td').eq(6).html());
    //var addQty = 0;
    //
    //$("#add-code").val(code);
    //$("#add-current").val(currentQty);
    cleanProduct();
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

    console.log("data: \n" + JSON.stringify(data));

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

        alertify.alert("Auto Spare Parts", "Product created corrctly",
            function(){
                $("#modal-product").modal('hide');
                loadStock();
            });

    }).fail(function (jqXHR, textStatus, textError){
        console.log("Error");
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );
        console.log("el textError es: \n" + textError );
        alertify.alert("An error has occurred.");
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

        alertify.alert("Auto Spare Parts", "Product updated corrctly",
            function(){
                $("#modal-product").modal('hide');
                loadStock();
            });
      }).fail(function (jqXHR, textStatus, textError){
        console.log("Error");
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );
        console.log("el textError es: \n" + textError );
        alertify.alert("An error has occurred.");
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
    $("#add-quantity").val(0);

    $("#btn-add").attr("onclick","addProduct("+id+")");
    $("#modal-add").modal();
}

function addProduct(id){
    var current = parseInt($("#add-current").val());
    var toAdd = parseInt($("#add-quantity").val());
    var total = current + toAdd;

    var code = $("#row-"+id).find('td').eq(0).html();
    var model = $("#row-"+id).find('td').eq(1).html();
    var brand = $("#row-"+id).find('td').eq(2).html();
    var type = $("#row-"+id).find('td').eq(3).html();
    var category = $("#row-"+id).find('td').eq(4).html();
    var autoCategory = $("#row-"+id).find('td').eq(5).html();

    var data = {
        code:code,
        model:model,
        brand:brand,
        type:type,
        category:category,
        autoCategory: autoCategory,
        quantity: total
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

        alertify.alert("Auto Spare Parts", "Product added corrctly",
            function(){
                $("#modal-add").modal('hide');
                loadStock();
            });


    }).fail(function (jqXHR, textStatus, textError){
        console.log("Error");
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );
        console.log("el textError es: \n" + textError );
        alertify.alert("An error has occurred.");
    });

}

function openShipProduct(id){
    console.log("Value: " + $("#row-"+id).find('td').eq(0).html());
    var code = $("#row-"+id).find('td').eq(0).html();
    var currentQty = parseInt($("#row-"+id).find('td').eq(6).html());
    var addQty = 0;

    $("#ship-code").val(code);
    $("#ship-current").val(currentQty);
    $("#ship-quantity").val(0);

    $("#btn-ship").attr("onclick","shipProduct("+id+")");
    $("#modal-ship").modal();
}

function shipProduct(id){
    var current = parseInt($("#ship-current").val());
    var toShip = parseInt($("#ship-quantity").val());
    var total = current - toShip;

    if (toShip > current){
        alertify.alert("Auto Spare Parts", "The quantity to ship is greater than the quantity in inventory.");
    }else{
        var data = {
            product:id,
            quantity:$("#ship-quantity").val(),
            name:$("#ship-name").val(),
            company:$("#ship-company").val(),
            address:$("#ship-address").val()
        }

        $.ajax({
            data: JSON.stringify(data),
            type: "POST",
            dataType:"json",
            cahce: false,
            url:"/shipment/",
            contentType: 'application/json; charset=utf-8',
        }).done(function (data, textStatus, jqXHR){
            console.log("el data es: \n" + data );
            console.log("el textStatus es: \n" + textStatus );
            console.log("el jqXHR es: \n" + jqXHR );

            alertify.alert("Auto Spare Parts", "Product successfully shipped",
            function(){
                removeProdcut(id, total);

                $("#modal-ship").modal('hide');
                loadShipments();
            });



        }).fail(function (jqXHR, textStatus, textError){
            console.log("Error");
            console.log("el textStatus es: \n" + textStatus );
            console.log("el jqXHR es: \n" + jqXHR );
            console.log("el textError es: \n" + textError );
            alertify.alert("An error has occurred.");
        });

    }



}

function removeProdcut(id, quantity){
    var code = $("#row-"+id).find('td').eq(0).html();
    var model = $("#row-"+id).find('td').eq(1).html();
    var brand = $("#row-"+id).find('td').eq(2).html();
    var type = $("#row-"+id).find('td').eq(3).html();
    var category = $("#row-"+id).find('td').eq(4).html();
    var autoCategory = $("#row-"+id).find('td').eq(5).html();

    var data = {
        code:code,
        model:model,
        brand:brand,
        type:type,
        category:category,
        autoCategory: autoCategory,
        quantity: quantity
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

        loadStock();

    }).fail(function (jqXHR, textStatus, textError){
        console.log("Error");
        console.log("el textStatus es: \n" + textStatus );
        console.log("el jqXHR es: \n" + jqXHR );
        console.log("el textError es: \n" + textError );
        alertify.alert("An error has occurred.");
    });
}