

$(document).ready(function () {
	
				$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
					
					opcijeZaDp ='<option value="4000" >HEP ODS</option>';
					
					//dataJSON = $.parseJSON(data);
					
					$.each(data, function (i, item) {
						
						
						opcijeZaDp += '<option value="' + item["sifra"] + '">' + item["naziv"] + '</option>';
						
					});
					


					$("#id_dp2").html(opcijeZaDp);
					

				}
			});
		


	// izbor stanice u distribucijskom području


	$('#id_dp2').change(function () {
		var value = $(this).val();

		
		//alert(value);
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/stanice/'+value,
				data: {
					/*'country': countryId*/
				},
				success: function (data) {

					opcijeZaStanicu = '<option value="-1">Odaberite stanicu:</option>';

					//dataJSON = $.parseJSON(data);
					$.each(data, function (i, item) {


						opcijeZaStanicu += '<option value="' + item["kratkiNaziv"] + '">' + item["dugiNaziv"] + '</option>';

					});
					odabraniDP = value;


					$("#id_stanica").html(opcijeZaStanicu);


				}
			});
		

	});




	// izbor mjerenja u prethodno odabranoj stanici


	$('#id_stanica').change(function () {
		var value2 = $(this).val();

		
		//alert(value);
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/mjerenja/'+odabraniDP+'?'+"stanicaKratki="+value2,
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					opcijeZaMjerenje =  '<option value="-1">Odaberite ID mjerenja:</option>';
					opcijeZaMjerenje2 =  '<option value="-1">Odaberite drugo mjerenje</option>';
					//dataJSON = $.parseJSON(data);
					$.each(data, function (i, item) {


						opcijeZaMjerenje += '<option value="' + item["kratkiNaziv"] + '">' + item["dugiNaziv"] + '</option>';
						opcijeZaMjerenje2 += '<option value="' + item["kratkiNaziv"] + '">' + item["dugiNaziv"] + '</option>';
					});



					$("#id_mjerenje2").html(opcijeZaMjerenje);
					
					//$("#id_status").text(odabranaStanica+";"+"sdf");

				}
			});
		

	});






	$('#id_mjerenje2').change(function () {
		var value3 = $(this).val();

		
		//alert(value3);
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sati/'+'10?'+"kratkiNaziv="+value3,
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					Rezultat = '';

					//dataJSON = $.parseJSON(data);
					$.each(data, function (i, item) {


						Rezultat +=  '<option value="' + item["kratkiNaziv"] + '">' + item["sifraDp"] +item["vrijednost"] +item["kvaliteta"] +item["vrijeme"] + '</option>';

					});



					$("#id_rezultat").html(Rezultat);
					//$("#id_status").text(odabranaStanica+";"+"sdf");

					

				}
			});
		

	});






});


