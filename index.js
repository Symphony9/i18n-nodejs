var Mustache = require('mustache');
var _lang = null;
var _filePath = null;//"../../locale.json";
var _locale = null;

module.exports = function(lang, filePath) {
	//set the lang and file relative path
	_lang = lang;
	_filePath = filePath;
	_locale = require(_filePath);

	//Get the rule for pluralization
	//http://localization-guide.readthedocs.org/en/latest/l10n/pluralforms.html 
	function get_rule(count, language) {
		switch(language){
			//nplurals=2; plural=(n > 1);
			case 'ach':
			case 'ak':
			case 'am':
			case 'arn':
			case 'br':
			case 'fil':
			case 'fr':
			case 'gun':
			case 'ln':
			case 'mfe':
			case 'mg':
			case 'mi':
			case 'oc':
			case 'pt_BR':
			case 'tg':
			case 'ti':
			case 'tr':
			case 'uz':
			case 'wa':
				return (count > 1) ? 1 : 0;
				break;
			
			//nplurals=2; plural=(n != 1);
			case 'af':
			case 'an':
			case 'anp':
			case 'as':
			case 'ast':
			case 'az':
			case 'bg':
			case 'bn':
			case 'brx':
			case 'ca':
			case 'da':
			case 'doi':
			case 'de':
			case 'el':
			case 'en':
			case 'eo':
			case 'es':
			case 'es_AR':
			case 'et':
			case 'eu':
			case 'ff':
			case 'fi':
			case 'fo':
			case 'fur':
			case 'fy':
			case 'gl':
			case 'gu':
			case 'ha':
			case 'he':
			case 'hi':
			case 'hne':
			case 'hu':
			case 'hy':
			case 'ia':
			case 'it':
			case 'kl':
			case 'kn':
			case 'ku':
			case 'lb':
			case 'mai':
			case 'ml':
			case 'mn':
			case 'mni':
			case 'mr':
			case 'nah':
			case 'nap':
			case 'nb':
			case 'ne':
			case 'nl':
			case 'nn':
			case 'no':
			case 'nso':
			case 'or':
			case 'pa':
			case 'pap':
			case 'pms':
			case 'ps':
			case 'pt':
			case 'rm':
			case 'rw':
			case 'sat':
			case 'sco':
			case 'sd':
			case 'se':
			case 'si':
			case 'so':
			case 'son':
			case 'sq':
			case 'sv':
			case 'sw':
			case 'ta':
			case 'te':
			case 'tk':
			case 'ur':
			case 'yo':
				return (count != 1) ? 1 : 0;
				break;

			//nplurals=1; plural=0;
			case 'ay':
			case 'bo':
			case 'cgg':
			case 'dz':
			case 'fa':
			case 'id':
			case 'ja':
			case 'jbo':
			case 'ka':
			case 'kk':
			case 'km':
			case 'ko':
			case 'ky':
			case 'lo':
			case 'ms':
			case 'my':
			case 'sah':
			case 'su':
			case 'th':
			case 'tt':
			case 'ug':
			case 'vi':
			case 'wo':
			case 'zh':
			case 'jv':
				return 0;
				break;

			//nplurals=2; plural=(n%10!=1 || n%100==11);
			case 'is':
				return (count%10!=1 || count%100==11) ? 1 : 0;
				break;

			//nplurals=4; plural=(n==1) ? 0 : (n==2) ? 1 : (n == 3) ? 2 : 3;
			case 'kw':
				return (count==1) ? 0 : (count==2) ? 1 : (count == 3) ? 2 : 3;
				break;

			//nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
			case 'uk':
			case 'sr':
			case 'ru':
			case 'hr':
			case 'bs':
			case 'be':
				return count%10==1 && count%100!=11 ? 0 : count%10>=2 && count%10<=4 && (count%100<10 || count%100>=20) ? 1 : 2;
				break;

			//nplurals=3; plural=(n==0 ? 0 : n==1 ? 1 : 2);
			case 'mnk':
				return count==0 ? 0 : count==1 ? 1 : 2;
				break;

			//nplurals=3; plural=(n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
			case 'sk':
				return (count==1) ? 0 : (count>=2 && count<=4) ? 1 : 2;
				break;

			//nplurals=3; plural=(n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2);
			case 'ro':
				return count==1 ? 0 : (count==0 || (count%100 > 0 && count%100 < 20)) ? 1 : 2;
				break;

			//nplurals=6; plural=(n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5);
			case 'ar':
				return count==0 ? 0 : count==1 ? 1 : count==2 ? 2 : count%100>=3 && count%100<=10 ? 3 : count%100>=11 ? 4 : 5;
				break;

			//nplurals=3; plural=(n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
			case 'cs':
				return count==1 ? 0 : (count>=2 && count<=4) ? 1 : 2;
				break;

			//countplurals=3; plural=(n==1) ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;
			case 'csb':
				return (count==1) ? 0 : count%10>=2 && count%10<=4 && (count%100<10 || count%100>=20) ? 1 : 2;
				break;

			//nplurals=4; plural=(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;
			case 'cy':
				return (count==1) ? 0 : (count==2) ? 1 : (count != 8 && count != 11) ? 2 : 3;  
				break;

			//nplurals=5; plural=n==1 ? 0 : n==2 ? 1 : (n>2 && n<7) ? 2 :(n>6 && n<11) ? 3 : 4;
			case 'ga':
				return count==1 ? 0 : count==2 ? 1 : (count>2 && count<7) ? 2 :(count>6 && count<11) ? 3 : 4;
				break;

			//nplurals=4; plural=(n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3;
			case 'gd':
				return (count==1 || count==11) ? 0 : (count==2 || count==12) ? 1 : (count > 2 && count < 20) ? 2 : 3; 
				break;

			//nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2);
			case 'it':
				return count%10==1 && count%100!=11 ? 0 : count%10>=2 && (count%100<10 || count%100>=20) ? 1 : 2; 
				break;

			//nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
			case 'lv':
				return count%10==1 && count%100!=11 ? 0 : count != 0 ? 1 : 2; 
				break;

			//nplurals=2; plural= n==1 || n%10==1 ? 0 : 1;
			case 'mk':
				return count=2; plural= count==1 || count%10==1 ? 0 : 1;
				break;

			//nplurals=4; plural=(n==1 ? 0 : n==0 || ( n%100>1 && n%100<11) ? 1 : (n%100>10 && n%100<20 ) ? 2 : 3);
			case 'mt':
				return count==1 ? 0 : count==0 || (count%100>1 && n%100<11) ? 1 : (count%100>10 && count%100<20 ) ? 2 : 3;
				break;

			//nplurals=3; plural=(n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
			case 'pl':
				return count==1 ? 0 : count%10>=2 && count%10<=4 && (count%100<10 || count%100>=20) ? 1 : 2;
				break;

			//nplurals=4; plural=(n%100==1 ? 1 : n%100==2 ? 2 : n%100==3 || n%100==4 ? 3 : 0);
			case 'sl':
				return count%100==1 ? 1 : count%100==2 ? 2 : count%100==3 || count%100==4 ? 3 : 0;
				break;

			default:
				return 0;
		}
	}

	return {
		//translation function
		__ : function(string, values) {
			//return translation of the original sting if did not find the translation
			var translation = string;
			if (typeof _locale[string] != "undefined" && typeof _locale[string][_lang] != "undefined") {
				translation = _locale[string][_lang];
			}
			//If user sent values to be rendered into the string
			//If the string have place to render values withen
			// if (values && (/{{.*}}/).test(translation)) {
			if ((/{{.+?}}/g).test(translation)) {
					var matches = translation.match(/{{.+?}}/g);
					console.log("matches", matches);
					for (var index in matches) {
						//get the match {{example}}
						var match = matches[index];
						//get the word in the match example
						var match_word = (match.replace('}}', '')).replace('{{', '');
						console.log("match_word", match_word);

						//translate the word if was passed in the values var
						if (typeof values[match_word] != "undefined" ) {
							translation.replace(match, values[match_word]);
							continue;//move to the next word in the loop
						}

						//if the matched word have a count
						if ((/\|\|.+/g).test(match_word)) {
							var temp_array = match_word.split("||");
							//update the matched word
							match_word = temp_array[0];
							//get the variable of the count for the word
							var item_count_variable = temp_array[1];
							console.log("item_count_variable", item_count_variable);

							//get the value form values passed to this function
							//TODO through error if not found in values
							var item_count = values[item_count_variable];
							console.log("item_count", item_count);

							//will get the rule or for pluralization based on the lang
							var rule = get_rule(item_count, _lang);
							console.log("rule", rule);

							if (typeof _locale[match_word][_lang] == "object") {
								translation.replace(match, _locale[match_word][_lang][rule]);
							}
						} else {
							//TODO CHECK IF MACHED WORD IN THE VALUES 
							translation.replace(match, _locale[match_word][_lang]);
						}
					}//end of for
			}//END OF IF 
			return translation;
		}
	}
}