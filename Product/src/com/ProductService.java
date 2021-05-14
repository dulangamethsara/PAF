package com;

import model.Product;

//For REST Service
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

//For JSON
import com.google.gson.*;

//For XML
import org.jsoup.*;
import org.jsoup.parser.*;
import org.jsoup.nodes.Document;

@Path("/Product")
public class ProductService {
	
		Product productObj = new Product(); 
		@GET
		@Path("/") 
		@Produces(MediaType.TEXT_HTML) 
		public String readProducts() 
		 { 
		 return productObj.readItems();
		 }
		
		//rid`,`productCode`,`productName`,`productPrice`,`productDesc
		@POST
		@Path("/") 
		@Consumes(MediaType.APPLICATION_FORM_URLENCODED) 
		@Produces(MediaType.TEXT_PLAIN) 
		public String insertProduct(@FormParam("productCode") String productCode, 
		 @FormParam("productName") String productName, 
		 @FormParam("productPrice") String productPrice, 
		 @FormParam("productDesc") String productDesc) 
		{ 
		 String output = productObj.insertProduct(productCode, productName, productPrice, productDesc); 
		return output; 
		}
		
		@PUT
		@Path("/") 
		@Consumes(MediaType.APPLICATION_JSON) 
		@Produces(MediaType.TEXT_PLAIN) 
		public String updateProducts(String ProductData) 
		{ 
		//Convert the input string to a JSON object 
		 JsonObject productObject = new JsonParser().parse(ProductData).getAsJsonObject(); 
		//Read the values from the JSON object
		 String rid =productObject.get("rid").getAsString(); 
		 String productCode = productObject.get("productCode").getAsString(); 
		 String productName = productObject.get("productName").getAsString(); 
		 String productPrice= productObject.get("productPrice").getAsString(); 
		 String productDesc =productObject.get("productDesc").getAsString(); 
		 String output = productObj.updateProducts(rid, productCode,productName, productPrice, productDesc);
		 
		      return output; 
		}

		@DELETE
		@Path("/") 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.TEXT_PLAIN) 
		public String deleteProducts(String productData) 
		{ 
		//Convert the input string to an XML document
		 Document doc = Jsoup.parse(productData, "", Parser.xmlParser()); 
		 
		//Read the value from the element <itemID>
		 String rid = doc.select("rid").text(); 
		 String output = productObj.deleteProduct(rid); 
		 return output; 
		}
	}

