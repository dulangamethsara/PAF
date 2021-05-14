$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateCustomerForm();
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidProductIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
			{ 
				url : "ProductAPI", 
				type : type, 
				data : $("#formProduct").serialize(), 
				dataType : "text", 
				complete : function(response, status) 
				{ 
					onProductSaveComplete(response.responseText, status); 
				} 
			});
	
});

function onProductSaveComplete(response, status)
{ 
	if (status == "success") 
	{ 
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") 
		{ 
			$("#alertSuccess").text("Successfully saved."); 
			$("#alertSuccess").show(); 
			$("#divItemsGrid").html(resultSet.data); 
		} else if (resultSet.status.trim() == "error") 
		{ 
			$("#alertError").text(resultSet.data); 
			$("#alertError").show(); 
		}
		
	} else if (status == "error") 
	{ 
		$("#alertError").text("Error while saving."); 
		$("#alertError").show(); 
	} else
	{ 
		$("#alertError").text("Unknown error while saving.."); 
		$("#alertError").show(); 
	} 
	$("#hidProductIDSave").val(""); 
	$("#formProduct")[0].reset(); 
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidProductIDSave").val($(this).closest("tr").find('#hidProductIDUpdate').val());
	$("#rid").val($(this).closest("tr").find('td:eq(0)').text());
	$("#productCode").val($(this).closest("tr").find('td:eq(1)').text());
	$("#productName").val($(this).closest("tr").find('td:eq(2)').text());
	$("#productPrice").val($(this).closest("tr").find('td:eq(3)').text());
	$("#productDesc").val($(this).closest("tr").find('td:eq(4)').text());
});

//REMOVE======

$(document).on("click", ".btnRemove", function(event)
{ 
	$.ajax( 
	{ 
		url : "ProductAPI", 
		type : "DELETE", 
		data : "rid=" + $(this).data("prodid"),
		dataType : "text", 
		complete : function(response, status) 
		{ 
			onProductDeleteComplete(response.responseText, status); 
		} 
	}); 
});

function onProductDeleteComplete(response, status)
{ 
	if (status == "success") 
	{ 
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") 
		{ 
			$("#alertSuccess").text("Successfully deleted."); 
			$("#alertSuccess").show(); 
			$("#divItemsGrid").html(resultSet.data); 
		} else if (resultSet.status.trim() == "error") 
		{ 
			$("#alertError").text(resultSet.data); 
			$("#alertError").show(); 
		} 
	} else if (status == "error") 
	{ 
		$("#alertError").text("Error while deleting."); 
		$("#alertError").show(); 
	} else
	{ 
		$("#alertError").text("Unknown error while deleting.."); 
		$("#alertError").show(); 
	} 
}

// CLIENT-MODEL================================================================
function validateCustomerForm()
{
	// productCode
	if ($("#productCode").val().trim() == "")
	{
		return "Insert productCode.";
	}
	// productName
	if ($("#productName").val().trim() == "")
	{
		return "Insert productName.";
	} 

	//productPrice
	if ($("#productPrice").val().trim() == "")
	{
		return "Insert productPrice.";
	}
	
	// productDesc 
	if ($("#productDesc").val().trim() == "")
	{
		return "Insert productDesc.";
	}
	
	
	return true;
}