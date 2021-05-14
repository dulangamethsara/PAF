<%@ page import="model.Product"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Product Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/product.js"></script>
</head>
<body>
 
<div class="container"><div class="row"><div class="col-6">
 
	<h1>PRODUCT PAGE</h1>
	<form id="formProduct" name="formProduct">
		<br>Product ID : 
 		<input id="rid" name="rid" type="text" class="form-control form-control-sm" readonly>
		<br>Product Code : 
 		<input id="productCode" name="productCode" type="text" class="form-control form-control-sm">
 		<br>Product Name : 
 		<input id="productName" name="productName" type="text" class="form-control form-control-sm">
 		<br> Product Price : 
 		<input id="productPrice" name="productPrice" type="text" class="form-control form-control-sm">
 		<br> Product Description : 
 		<input id="productDesc" name="productDesc" type="text" class="form-control form-control-sm">
 		<br>
 		
 		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 		<input type="hidden" id="hidProductIDSave" name="hidProductIDSave" value="">
	</form>
	<br>
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>
	<br>
	<div id="divItemsGrid">
	 	<%
	 		Product productObj = new Product(); 
 			out.print(productObj.readItems()); 
 		%>
	</div>
</div> </div> </div> 
</body>
</html>