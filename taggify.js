jQuery.fn.taggify = function(){
		attrName = jQuery(this).attr("name");
		jQuery("<ul class='taggify-container' />").insertBefore(this);
		jQuery('.taggify-container').append("<li class='input-cntnr'/>");
		newInput = jQuery('.taggify-container').children("li").append(jQuery(this)[0].outerHTML).append(jQuery(this)[0].outerHTML);
		newInput.children("input").removeAttr("name");
		newInput.children("input:first-child").attr('type', 'hidden').attr('name', attrName);
		//jQuery('.taggify-container').children("li").append(jQuery(this)[0].outerHTML).attr('type', 'hidden').attr('name', attrName);
		jQuery(this).remove();

		/* Generica per la creazione del tag */
		function taggifyTermResult(e){
			var key = e.which;

			if(key == 13) {
				r = jQuery(this);

				if(r.val() === ""){
					return;
				}

				oldVal = jQuery("li.input-cntnr").children("input:first-child").val();
				if(oldVal != ""){
					jQuery("li.input-cntnr").children("input:first-child").val(r.val()+", "+oldVal);
				} else {
					jQuery("li.input-cntnr").children("input:first-child").val(r.val());
				}
				jQuery("<li class='tag-container'>"+r.val()+" <a class='fa fa-remove'></a></li>").insertBefore(r.parent());
				r.val("");
				jQuery('li.tag-container').on('click', '.fa-remove', taggifyTagRemove);
			}
		}
		jQuery('.taggify').on('keypress', taggifyTermResult);

		function taggifyTagRemove(){
			text = jQuery(this).parent('li').text();

			oldVal = jQuery("li.input-cntnr").children("input:first-child").val();
			arrayVal = oldVal.split(',');

			newArrayVal = [];
			jQuery.each(arrayVal, function(i, v){
				str = v.trim();
				newArrayVal[i] = str;

			});

			jQuery.each(newArrayVal, function(chiave, valore){
				if(text.indexOf(valore) >= 0){
					newArrayVal.splice(chiave, 1);
				}
			});

			jQuery("li.input-cntnr").children("input:first-child").val(newArrayVal.join());
			jQuery(this).parent('li').remove();
		}


	}
	jQuery('.taggify').taggify();
