$(function() {
	console.log("abc");
	$.ajax({
		type: "GET",
		url: "http://localhost:8282/books",
		dataType: "json"
	})
		.done(function(data) {
			printBooks(data);
		})
		.fail(function() {})
		.always(function() {});
});

function printBooks(data) {
	console.log(data);
	$.each(data, function(index) {
		var book = $("<h1>")
			.addClass("text-center")
			.text(data[index].title);
		$("#books").append(book);

		var bookTd = $("<table>").addClass(
			"table table-sm text-center table-bordered table-hover"
		);
		book = $("<tr>").text("id: " + data[index].id);
		bookTd.append(book);
		book = $("<tr>").text("isbn: " + data[index].isbn);
		bookTd.append(book);

		book = $("<tr>").text("author: " + data[index].author);
		bookTd.append(book);
		book = $("<tr>").text("publisher: " + data[index].publisher);
		bookTd.append(book);
		book = $("<tr>").text("type: " + data[index].type);
		bookTd.append(book);
		book = $("<hr>");
		bookTd.append(book);
		$("#books").append(bookTd);
	});
}

$("#books-form").submit(function(e) {
	var form = $("#books-form").serializeArray();
	var formObject = {};
	$.each(form, function(index, element) {
		formObject[element.name] = element.value;
	});
	console.log(formObject);
	console.log(JSON.stringify(formObject));

	$.ajax({
		headers: {
			"Content-Type": "application/json"
		},
		type: "POST",
		url: "http://localhost:8282/books",
		data: JSON.stringify(formObject),
		dataType: "json",
		success: function(data) {
			alert(data);
		}
	});

	e.preventDefault();
});
