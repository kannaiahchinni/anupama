(function(){
	
	angular.module('webapp').controller('homeCtrl',['$scope', '$location','$http','_','Index','service','$modal',function($scope,$location,$http,_,Index,service,$modal){
				
		$scope.cantoIndex = []; // this array to hold the sloka index objects. 
		$scope.completeSlokas = [];
		
		$scope.chapters =[];
		$scope.slokas = [];
		$scope.showSearchBar = false;
		$scope.canto =1;
		$scope.canto1 =[];
		$scope.htmlname = "";
		
		$scope.sloka = true;
		$scope.summary=false;
		$scope.allSlokas = true;
		$scope.searchBar = true;
		$scope.showModal = false;
		
		$scope.active ="";
		
		
		$scope.slokaInfo =[];
		
		//$scope.summaryFileName = "html/SV-1/summary.html";
			$scope.home = function(){
			//console.log("navigating to home page ");	
			$location.path("/home/slokas");
			console.log($scope.showSummary);
			
		}
			$scope.load = function(sno,sloka){
				var num = parseInt(sloka.slokaNo);
				$scope.active = num;
				console.log($scope.active);
				var file ="" , canto ="";
				if(sloka.sloka != "Summary"){
					$scope.summary=false;
					$scope.sloka = true;
						$scope.showInterface = true;
						$scope.searchBar = false;
					$scope.showSummary = false; //hiding summary division to show sloka information 
					var cls="."+sno+"."+num;
				_.each($scope.chapters, function(s){
					if(parseInt(s.slokaNo) == num){
						$scope.slokas = [];
						var format = ["I","II","III"];
						$scope.slokas.push(s);
						$scope.showSearchBar = true;
						 file = "SV-".concat(num);
						 canto = "SV-".concat(format[sno-1]);
						$scope.htmlname = "html/"+canto+"/"+file+"/"+file+".html";
					}
				});
				
				}else{
					$scope.summary = true;
					$scope.sloka = false;
					//$scope.show = false;
					$scope.summaryFileName = "html/SV-"+sno+"/summary.html";
					// $("."+sno+".0").addClass("active");
				//	$scope.showSearchBar = false;
				//	$scope.slokas = $scope.chapters;
				}
				
				
				//console.log($scope.slokas.length);
			}
		
		$scope.init = function(){
			
			service.getSlokaIndex().success(function(data){
				$scope.cantoIndex = data[0];
			});
			
			service.getAllSlokas().success(function(data){
				$scope.completeSlokas = data;
				console.log(data);
				$scope.slokas = $scope.completeSlokas[0].canto1;
				$scope.chapters = angular.copy($scope.slokas);
				console.log(angular.toJson($scope.completeSlokas.canto2));
			});
						
		}
		$scope.init();
		
		
		/*$scope.loadCantos = function(){
			console.log("inside of loadCantos method ..");
			console.log(angular.toJson($scope.cantoIndex));
			
			if(!Index.isCalled){
				$http.get('json/completeIndex.json').success(function(data){
					Index.cantos = data[0];
					$scope.canto1 = Index.cantos;
					Index.isCalled = true;
				}).error(function(){
					console.log('error');
				});
			}else{
				$scope.canto1 = Index.cantos;
			}
			console.log("Index.isCalled value "+ Index.isCalled);
			console.log($scope.canto1);
		}*/
		
		$scope.showAllSlokas = function(chapter){
			$scope.sloka = true;
			$scope.showInterface = false;
			//$location.path("home/slokas");
			$scope.searchBar = true;
			$scope.loadData(chapter);
			console.log('inside of all slokas');
			$scope.summary = false;
		}
		
		$scope.showPopUp = function(num,sloka){
			var format = ["I","II","III"];
			 var file = "SV-".concat(num);
			var canto = "SV-".concat(format[$scope.canto-1]);
			filename = "html/"+canto+"/"+file+"/"+file+".html";
			$scope.fileName = filename;
			$scope.slokaText= sloka;
			filename = "html/translate.html";
			console.log('filename : '+ filename);
			console.log('filename '+ $scope.fileName);
			console.log($scope.canto);
			 //$scope.showModal = !$scope.showModal;
			 $modal.open({
				 templateUrl:filename,
				/*template:'<div class="model"><div class="modal-header">Translation</div>'
					+'<div class="modal-body">'
					+'<div ng-include="\'fileName\'"></div>'
					+'</div></div>',*/
				size:'lg',
				controller:'modelController',
				resolve:{
					fileName:function(){
						return $scope.fileName;
					},
					sloka: function(){
						return $scope.slokaText;
					}
				}
				
			});
			 console.log('filename : '+ filename);
			 $('.modal-body').load(filename);
			 console.log('filename : '+ filename);
		}
		
		$scope.loadData = function(no){
			console.log(no);
			$scope.canto = no;
			if(no ==1){
				$scope.slokas = $scope.completeSlokas[0].canto1;
			}
			else if(no ==2){
				$scope.slokas = $scope.completeSlokas[1].canto2;
			}else if(no == 3){
				$scope.slokas = $scope.completeSlokas[2].canto3;
			}
			//$scope.slokas = $scope.completeSlokas.canto1;
			$scope.chapters = angular.copy($scope.slokas);
		}
		
		//$scope.loadCantos();
			
	}]).controller('modelController',['$modalInstance','fileName','$scope','sloka','$log',function($modalInstance,fileName,$scope,sloka,$log){
	
		$scope.fileName = fileName;
		$scope.slokaText = sloka;
		$log.info($scope.fileName);
	 	$log.info($scope.slokaText);	
		$scope.close = function(){
			$modalInstance.dismiss();
		}
		
	}]).controller('summaryCtrl',['$scope','$log',function($scope,$log){
		
		$log.info('inside of summaryCtrl ');
		$scope.current = "sloka1";
/*		$scope.$watch(current,function(){
			$log.info($scope.current);
		});
*/		
		$scope.active = function(val){
			$scope.current = val;
			$log.info($scope.current);
		}
		
		
		
		$scope.cantos = [{
			"canto2": [{
				"title": "Sanskrit",
				"desc": "कार्यद्वये समुपस्थिते सति भगवान् श्रीकृष्णः बृहस्पति-शुक्राचार्यतुल्याभ्यां गुरुवर्याभ्यां राजनीतिशास्त्रज्ञाभ्यां बलराम-उद्धवाभ्यां समं मन्त्रोचितं प्रदेशं राजप्रासादसभाकक्षं प्राविशत् । तत्र भगवान् श्रीकृष्णः स्वाभिप्रायम् इत्थं प्रत्यपादयत् - “भगवन्! अस्माकं सम्मुखं कार्ययुगलं समुपस्थितम् - (१) धर्मराजयुधिष्ठिरस्य यज्ञे गमनम् (२) चेदिराजं शिशुपालं प्रति विजयाभियानञ्च । उदीयमानः शत्रुः न समुपेक्षणीयः । सः समस्तं विश्वं पीडयति इति मम मतम् । विषयेऽस्मिन् भवतोः किमभिमतम् ?” इति । श्रीकृष्णवचनमाकर्ण्य शत्रोः शिशुपालस्य अपकारं च स्मृत्वा बलरामस्य ओष्ठौ क्रोधेन स्फुरितौ । अक्षिणी घूर्णनं प्रापतुः। दीर्घैः उष्णैश्च निःश्वासैः उपकण्ठं विराजमाना वनमाला म्लाना समजायत । क्रोधेनारक्तेऽङ्गे स्वेदलवाः प्रादुरभवन् । अथ \"न सः चेदिराजः शिशुपालः कदापि समुपेक्षणीयः । तं प्रति विजयाभियानमेव वरम्\" इति बलरामः व्यग्रतया स्वाभिप्रायमित्थं प्राकटयत् ।  तत्पश्चात् उद्धवः अनुद्धततस्वभावः सविनयं स्वाभितमतमित्थं जगाद-\"भगवन! भवतोऽभिमतस्य क्रियान्वयनाय बलरामेण निवेदिते सति मम वक्तव्यं पिष्टपेषणमात्रम् अस्ति । तथापि गुरुगौरवेण, न तु साचित्येन अहमपि किञ्चित् वक्तुकामः। जनैः धैर्यं समवलम्ब्य युक्तिपूर्वकं षाड्गुण्यप्रयोगो विधेयः, न तु त्वरया इति षाड्गुण्यादेरपि उपादेयता । पञ्चाङ्गप्रधानो मन्त्रोऽपि अवसरं प्रतीक्ष्य क्रियान्वयनीयः । अतः चेदिराजः शिशुपालः 'अशक्त' इति मत्वा न कदापि अवहेलनीयः । मन्त्रशक्तिपूर्विका हि उत्साहशक्तिवल्लरी कोशदण्डजां प्रभुशक्तिं फलति । भवता निर्णीतः मखविघ्नः मा भवतु । अतः प्रथमं राजसूययज्ञे सम्मेलनाय प्रथमं प्रयतितव्यम् । ततश्च चैद्यं प्रति विजयाभियानमिति मे प्रतिभाति\" इति । भगवता श्रीकृष्णेन उद्धवमन्त्रणामेवाऽङ्गीकृत्य सभा विसर्जिता ।"
			}, {
				"title": "Hindi",
				"desc": " इस सर्ग में श्रीकृष्ण भगवान् का बलरामजी तथा उद्धवजी के साथ मन्त्रणा करना प्रतिपाद्य अंश है । नारदजी के लौटने के उपरान्त धर्मराज युधिष्ठिर से राजसूय यज्ञ में सम्मिलित होकर सहायता करने के लिए निमन्त्रित श्रीकृष्ण भगवान् की मित्रकार्य-सम्पादनार्थ युधिष्ठिर के यज्ञ में सम्मिलित होने हस्तिनापुर जाना चाहिये या देवकार्यसम्पादनार्थ शिशुपाल के साथ युद्ध करने चेदिदेश आना चाहिये ? इस विषय में संशयालु होकर मन्त्रणा करने के लिये मन्त्री एवं चाचा उद्धवजी तथा अग्रज बलरामजी के साथ मन्त्रणागृह में पहुँचे और 'हम लोगों के बिना भी युधिष्ठिर लोकविजयी भीम, अर्जुन आदि भाइयों के साथ यज्ञ कर सकते हैं, अत एव जगत्पीडितकर्ता शत्रु की उपेक्षा करना उचित प्रतीत नहीं होता' इस प्रकार अपना अभिमत व्यक्त करते हुए उन लोगों से भी अपनी-अपनी सम्मति देने की प्रार्थना की । यह सुनते ही अग्रज बलरामे के ओठ क्रोध से फुरफुराने लगें । उनकी नशीली आँखें क्रोध से आरक्त हो उठीं । गले की वनमाला ठण्डी आहों से मुरझा गयी । क्रोध से सारा शरीर लाल हो गया और उस पर पसीने की बूँदें चमकने लगीं । संक्षिप्त रूप से बलराम का अभिमत इस प्रकार है - उन्होंने अनेकविध युक्ति तथा दृष्टान्तों के द्वारा श्रीकृष्ण भगवान् के वचन का समर्थन करते हुए शीघ्रातिशीघ्र शिशुपाल के प्रति अभियान करने के लिए अपनी सम्मति दी । तत्पश्चात श्रीकृष्ण के दृष्टि द्वारा संकेत करने पर बृहस्पति के शिष्य, सचिव उद्धवजी ने तर्कपूर्ण विविध युक्तियुक्त वचनों से बलरामजी के प्रत्येक वचन का खण्डन कर धर्मराज युधिष्ठिर के यहाँ यज्ञ में सम्मिलित होने के लिए कहा था । राजनीति-निपुण पितृव्य एवं मन्त्री उद्धवजी के वचन के अनुसार ही कार्य करने का निर्णय कर श्रीकृष्ण सभा विसर्जित कर कार्यान्तर साधन में लग गये । "
			}, {
				"title": "English",
				"desc": "The colophon at the end of this canto mentions that the title of the canto is 'Mantravarṇanam', with which it is evident that the theme of this canto is 'Counsel'. Hence, the theme is a blend of philosophy and polity endowed with poetic excellence of the poet Māgha. Śrī Kṛṣṇa holds a council with his brother Balarāma and uncle Uddhava and discusses whether hostilities should be immediately commenced or should he first attend Rãjasūya sacrifice which was soon to be performed by Yudhiṣṭhira and which had been appointed by himself. Balarāma, the impetuous fiery here, is for immediate attack of Śiśupāla, setting forth, in support of his opinion, various considerations of policy. Uddhava, the sage counsellor, however holds that time is not yet ripe for punishing the insolent king of Cedī , that an opportunity for attack would be given by Śiśupāla himself and that therefore Kṛṣṇa, should give up, for the present, the thought of levying war on his inveterate foe. The opinion of Uddhava prevails."
			}
			],
			"canto1": [{
				"title": "Sanskrit",
				"desc": "एकदा द्वारकापुर्यां रुक्मिणीरूपया श्रिया समेतः वसुदेवरूपिणः कश्यपस्य वेश्मनि कृष्णरूपेण तिष्ठन् हरिः देवर्षिं नारदम् आकाशमार्गात् अवतरन्तं अपश्यत् । अम्बरे विद्योतमानः सः प्रथमं तेजःपुञ्ज इव, ततः शरीरी इति, ततः पुरुषविशेष इति ततश्च नारद इति प्रतीयते स्म । तत्र आकाशचारिणः देवा देवर्षिमनुसरन्ति स्म, तान् निवर्त्य ततोऽवतीर्णश्च सः वासुदेवस्य प्रासादे पदयुगलं स्थापयामास । उपवेशनात् पूर्वमेव सिंहासनात् उत्थितः श्रीकृष्णः देवर्षिं नारदम् अर्घ्यादिविधिना सम्पूजयति स्म, ततश्च स्वहस्तदत्ते आसने उपावेशयत् । ततः श्रीकृष्णः नारदाय तदीयागमनहेतुं पप्रच्छ । नारदश्च सविनयम् इत्थं न्यवेदयत् श्रीकृष्णम् - “भगवन्! योगिनामपि त्वमेव साक्षात्करणीयः इत्यतः गौरवास्पदं प्रयोजनं किमस्ति ? दुष्कृतां विनाशाय यदि भवान् नावतरेः, ततः योगिभिरपि अनिरूपिस्त्वं मादृशां साक्षात्कारविषयः कथं स्याः? देवेन्द्रेण प्रहितं सन्देशं श्रावयितुं भवत्सकाशमागमनं हि मम कृते सौभाग्यविषयः। अधुना कंसादिवधात् भवतो या स्तुतिर्विधीयते, सा तिरस्क्रियैव । यतः पूर्वं तु हिरण्याक्षप्रभृतिदैत्यानां भवता संहारो विहितः, तेषां समक्षं तु कंसादिमहीभृतः मृगायन्ते खलु । भवता पूर्वं नृसिंहावतारं गृहीत्वा यस्य हिरण्यकशिपोः वधो विहितः, यं रावणं भवान् रामावतारे अवधीत्, स एव शैलूष इव शिशुपालरूपेण अवतीर्य त्रिभुवनमुत्पीडयति । तस्यात्याचारैः पुरन्दरोऽपि चिन्ताक्रान्तः अस्ति । भवान् एव अस्य शिशुपालसय संहारं कर्तुं प्रभवति नान्यः इत्ययं तस्यैव सन्देशः । अतो भवता तद्वधं विधाय देवराजेन साकं त्रिभुवनजनः दुःखभरैः मोचितव्यः, सुखभरैश्च संयोजयितव्यः\" इति । श्रीकृष्णः देवराजस्य सन्देश 'ओम्' इति स्वीचकार । देवर्षिश्च नभसि समुत्पतितः । तदा भृकुटिच्छलेन श्रीकृष्णस्य वदने शत्रुविनाशसूचकः धूमकेतुः स्थानं चकार । "
			}, {
				"title": "Hindi",
				"desc": "इस सर्ग में नारदजीका द्वारकापुरी में आकर श्रीकृष्ण भगवान् से शिशुपालवध करने का इन्द्र सन्देश देते हैं । जब जगदाधार श्रीकृष्ण भगवान् द्वारकापुरी में लोकशासन कर रहे थे, तब, एकबार नारदजी आकाशमार्ग से उनके यहाँ आये, उन्हें देखकर श्रीकृष्ण भगवान् ने यथोचित अतिथिसत्कार कर उनकी प्रशंसा करते हुए आनेका कारण पूछा । उत्तर में नारदजीने श्रीकृष्ण भगवान् के दर्शन को ही प्रधान कारण बतलाते हुए इन्द्र के सन्देशरूप में शिशुपाल को मारने के लिए कहा तथा उसकी परमावश्यकता प्रदर्शनार्थ शिशुपाल के पूर्वजन्म में 'हिरण्यपकशिपु' तथा 'रावण' होकर देवपीडन आदि उनके औद्धत्यपूर्ण कार्यों को विस्तार के साथ कहा और यह भी कहा कि उन्हें भी नरसिंह तथा दशरथनन्दन राम होकर आपने ही मारा तथा पुनः शिशुपाल के औद्धत्यपूर्ण कार्यों को कहते हुए 'उसे भी आप ही मार सकते हैं' ऐसा कहा । नारदजीद्वारा कथित इन्द्रसन्देश को सुनकर श्रीकृष्ण भगवान् ने क्रोध से भृकृटि चढ़ा ली और शिशुपाल को मारने की स्वीकृति प्राप्त कर नारदजी आकाश को लौट गये ।"
			}, {
				"title": "English ",
				"desc": "When Śrī Kṛṣṇa was ruling the world at Dwārakā, sage Nārada descended from heaven to his abode. Having received hospitality as a guest and having been questioned the purpose of his arrival by Śrī Kṛṣṇa, he praised the lord and then replied thus. He conveyed him the command of lord Indra, and incited him to war with his cousin but mortal enemy, Śiśupāla, king of Cedī. At this juncture, the sage reminds him of previous births of Śiśupāla such as 'Hiraṇyakaśipu', 'Rāvaṇa' and others, the way they tormented the world and also the way how lord Śrī Kṛṣṇa took initiative to slay them. Having heard the command of Lord Indra through sage Nārada, the lord had uttered an assent and anger took abode in the guise of the curve of his eye-brows on his face that resembled the sky overcast with the comet. Nārada, too ascends back to the sky."
			}],
			"canto3": [{
				"title": "Sanskrit",
				"desc": "उद्धवमन्त्रणामङ्गीकृत्य चैद्यं प्रति विजययात्राया निश्चयं परित्यज्य भगवान् श्रीकृष्णः राजसूययज्ञे सम्मिलितुं धर्मराजराजधानीम् इन्द्रप्रस्थाभिधानां प्रतस्थे | तदा भगवता राजतमातपत्रं धृतम् | भगवन्तमुभयतः चामरयुगलं व्यराजत | मौलौ विराजमानं मुकुटं विविधरत्नखचितगोवर्धनाचलमिव शुशुभे | उभयोः कर्णयोः मरकतमणिखचितं काञ्चनकुण्डलद्वयं शुशुभे | हस्तयोः केयूरे अदीपताम् | वलयप्रोतपद्मरागमणिकिरणसङ्क्रान्ताः स्वभावत आरक्ताश्च नखाग्राः भगवतो नृसिंहस्य हिरण्यकशिपुवक्षोविदारणलीलां स्मारयामासुः | मुक्तालतया वक्षो व्यराजत | वक्षसि धृते कौस्तुभमणौ प्रतिबिम्बितं समस्तं विश्वं साक्षाच्चकार लोकः | भगवता उपकण्ठं धृता मुक्तामाला पादाङ्गुष्ठं चुचुम्ब | एवं प्रस्थानात् पूर्वमलङ्कृतस्य भगवतो लक्ष्मीः अखिललोककान्ता व्यराजत, वक्षसि विराजमाना तु लक्ष्मीः अन्यैवासीत् अनन्यकान्ता | भगवन्तं श्रीकृष्णं प्रस्थातुकामं प्रसाधितवपुषयुवतयो महिष्यः परिवेष्टयन्ति स्म | ततो भगवता सुदर्शनं चक्रं, कौमोदकी गदा, नन्दकः खड्गः, शार्ङ्ग धनुश्च करेषु दध्रिरे | अथ पाञ्चजन्यः शङ्खो ननाद | पुष्यरथं चाधिरुरोह भगवान् | तस्योपरि गरुडध्वजः व्यराजत | प्रयाणसमये जायमाने पटहनादे नादान्तराणि व्यलीयन्त | अथ सा पुष्यरथयात्रा प्रारभत, सैन्यानि च चन्द्रवंशीयं श्रीकृष्णचन्द्रमनुसरन्ति स्म | अग्रे गजसेना ययौ, ततश्च रथसेना | अश्वसेनया च सुवर्णधूलिः खुरैराहता | जनौघः प्रतिरथ्यं तां यात्रां द्रष्टुकामः एकत्रितः | भगवान् द्वारावत्याः सौन्दर्यं निरीक्षमाणः शनैः गमनं नाविन्दता | द्वारावती काञ्चनवनप्रवेष्टिता मध्येसमुद्रं व्यराजत, या समस्तपृथिव्याः ननु प्रतिकृतिरासीत् | यस्याः तटेषु रत्नावलयः प्रसृताः | वणिक्पथे च रत्नपूगाः विक्रयाय विकीर्णाः | यस्याः प्राकारः गगनचुम्बी आसीत्, यत्रत्या तरुण्यः अप्सरसामनुकृतिं विदध्युः | यस्यां जनैः द्वयेऽपि विनीतमार्गाः नामुच्यन्त | अमरावतीं च यामाह्वास्त | त्रिलोकीतिलको भगवान् यस्याः तिलको बभूव | एवं क्रमेण नगरीं निरीक्षमाणः भगवान् शनैः शनैः नगरात् निष्क्रमणं चकार, ततश्च सैन्यानि | एवं तटं प्राप्य समुद्रस्य पारेजलं श्रीकृष्णः वनावलीः अपश्यत् | भगवन्तं श्रीकृष्णमागतं वीक्ष्य समुद्रः तं प्रत्युज्जगामेव | चमूचरैः कच्छभुवां प्रदेशाः आसेदिरे, तैश्च समुद्रात् आतिथ्यसत्कारो लेभे | अथ द्वारावतीपुर्या निष्क्रान्तः श्रीकृष्णबलस्य सागरस्य च महदन्तरं समभवत् |"
			}, {
				"title": "Hindi",
				"desc": " (द्वारापुरीसे श्रीकृष्ण भगवान् के प्रस्थान का तथा  द्वारकापुरी और समुद्रका वर्णन )   युद्ध का विचार स्थगित होने से  सौम्यमूर्ति श्रीकृष्ण भगवान् अनेकविध बहुमूल्य श्वेतच्छत्र,  चामर, मुकुट, कुण्डल, केयूर, कङ्कण, मुक्ताहार, कौस्तुभमणि,  मेखला, करधनी आदि भूषण तथा तप्तसुवर्णवत् चमकते हुए पीतम्बर को  धारण कर साथ में कौमोदकी गदा, नन्दक खड्ग, शार्ङ्ग धनुष,  पाञ्चजन्य शङ्ख को ग्रहण कर सर्वत्र अप्रतिहतगति रथ पर सवार हुए  जिस पर गरुडचिह्नाङ्कित पताका फहरा रही थी, और उनके पीछे  बड़ी-बड़ी पताकाओं को फहराती हुई अपरिमित चतुरङ्गिणी सेना चल रही  थी । उनको देखने के लिए नागरिकों की भीड़ आगे निकलने वाली गलियों  के रास्ते पहले पहुँच जाती थी । श्रीकृष्ण भगवान् की राजधानी  सुवर्णमयी द्वारकापुरी समुद्र को मध्य में विदीर्ण कर ऊपर निकली  हुई वडवानल की ज्वाला-सी शोभती थी । उसके बाजारों में दुकानों पर  बहुमूल्य रत्नों के ढेर लगे थे । उसकी अट्टालिकाएँ, परकोटे बहुत  ही ऊँचे तथा अत्यन्त चिकने थे और उनपर बनाये गये चित्र सजीव-से  प्रतीत होते थे । अप्सराओं के समान सुन्दरी बहँकी रमणियाँ मानरहित  होकर सदा कामोत्कण्ठिता रहती थीं । ऐसी स्वर्गोपम द्वारकापुरी को  देखते हुए श्रीकृष्ण भगवान् जब उससे बाहर निकले तब समुद्र को देखा  । उस्में बहुत-सी नदियाँ आकर मिल रही थीं, उससे निकलते हुए फेन  तथा चञ्चल तरङ्ग एवं गम्भीर ध्वनि उसके मृगी का रोगी होने का भ्रम  उत्पन्न करते थे । उस पारकी श्यामल वनावलि बहुत सुहानी लगती थी ।  तट पर मोती बिखर रहे थे और शीतल मन्द सुगन्ध वायु से सैनिकों का  श्रम दूर हो जाता था । ऐसे समुद्र के तट पर पड़ाव डालकर सैनिकों  ने लवङ्ग के फूलों का कर्णभूषण पहना और छककर नारियल का पानी पिया "
			}, {
				"title": "English ",
				"desc": "(Departure from Dwāraka and depiction of Dwāraka and Ocean) Śrī Kṛṣṇa, in the present canto departs for Indraprastha, the capital of Yudhiṣṭhira. The greater part of this canto consist only of long descriptions. When the decision of battle is stopped, Śrī Kṛṣṇa adorned himself with various gems and having dressed up in yellow clothes, took all his five weapons namely, (i) the holy disc – Sudarśana (ii) Mace – Kaumodakī (iii) Sword – Nandaka, (iv) Bow – Śārṅga and (v) the conch – Pāñcajanya and started on his chariot along with his army. On his way, there were long descriptions of markets . When he came out of Dwāraka city, he saw an ocean, where the poet Māgha depicts it's glory wonderfully."
			}]
		}];
		
		$log.info($scope.cantos);
		
		 $scope.tabs = [
		                { title:'Dynamic Title 1', content:'Dynamic content 1' },
		                { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
		              ];
		
	}])
	
	;/*.directive('modal', function () {
	    return {
	        template: '<div class="modal fade">' + 
	            '<div class="modal-dialog">' + 
	              '<div class="modal-content">' + 
	                '<div class="modal-header">' + 
	                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
	                  '<h4 class="modal-title">{{ title }}</h4>' + 
	                '</div>' + 
	                '<div class="modal-body" ng-transclude></div>' + 
	              '</div>' + 
	            '</div>' + 
	          '</div>',
	        restrict: 'E',
	        transclude: true,
	        replace:true,
	        scope:true,
	        link: function postLink(scope, element, attrs) {
	          scope.title = attrs.title;

	          scope.$watch(attrs.visible, function(value){
	            if(value == true)
	              $(element).modal('show');
	            else
	              $(element).modal('hide');
	          });

	          $(element).on('shown.bs.modal', function(){
	           // scope.$apply(function(){
	              scope.$parent[attrs.visible] = true;
	           // });
	          });

	          $(element).on('hidden.bs.modal', function(){
	           // scope.$apply(function(){
	              scope.$parent[attrs.visible] = false;
	            //});
	          });
	        }
	      };
	    });*/
	
})();
