//CKEDITOR.config.extraAllowedContent = '*(fa-facebook,tweet-text,facebook-text,tweet-text,fancyboxlaunch,fancybox.iframe,fa,fa-arrows-alt,social-btn,sb-closed,fa-external-link-square)';


CKEDITOR.plugins.add('mediabox', {
	requires: 'widget',
	icons: 'mediabox',
	init: function (editor) {

		var _editables = {
			title: {
				selector: '.widget_h4_header'
			},
			markup: {
				selector: '.media_embed',
					allowedContent: 'iframe{*}[*]'
			},
			caption: {
				selector: 'span.caption'
			},
			credit: {
				selector: 'span.credit'
			},
			tweet: {
				selector: 'span.tweet-text',
					allowedContent: 'a{*}[*]'
			},
			facebook: {
				selector: 'span.facebook-text',
					allowedContent: 'a{*}[*]'
			}
		};

		CKEDITOR.dialog.add('mediabox', this.path + 'dialogs/mediabox.js');

		editor.addContentsCss(this.path + 'css/styles.css');

		editor.widgets.add('mediabox', {

			dialog: 'mediabox',

			button: 'Create a Media Box',

			template:
			'<div class="media_widget" data-type="video">' +
			'  <h4 class="widget_h4_header">Media Header Goes Here</h4>' +
			'  <div class="media_embed"><iframe width="100%" height="450px" src="https://www.youtube.com/embed/CdtrfXK7bcg" frameborder="0" allowfullscreen></iframe></div>' +
			'	<div class="widgeticon">' +
			'		<a href="#" class="fullIcon fancyboxlaunch fancybox.iframe"><i class="fa fa-arrows-alt"></i><span class="hidden"><!--ckeditor needs this span to make the widget work. facepalm.-->&nbsp;</span></a>' +
			'		<a href="#" class="shareIcon social-btn sb-closed"><i class="fa fa-external-link-square"></i><span class="hidden"><!--ckeditor needs this span to make the widget work. facepalm.-->&nbsp;</span></a>' +
			'	</div>' +
			'	<div class="caption_credit"><p><span class="caption">The importance of Operational Peer Reviews</span><span class="credit">@2015 STAIT</span></p></div>' +
			'	<div class="socialbtns">' +
			'		<span class="socialbtnsIcon"><i class="fa fa-facebook"></i><span class="facebook-text">fb text here</span></span>' +
			'		<span class="socialbtnsIcon"><i class="fa fa-twitter"></i><span class="tweet-text">tweet text here</span></span>' +
			'	</div>' +
			'</div>',

			editables: _editables,

			allowedContent:
				'div{*}(*);' +
				'a{*}(*); i{*}[*]' +
				'a[!fullIcon,!shareIcon]{*}' +
				'div(!media_widget);' +
				'h4(!widget_h4_header);' +
				'div(!media_embed);' +
				'div(!widgeticon);' +
				'div(!caption_credit);' +
				'div(!socialbtns);' +
				'span[*]{*}; iframe[!src,frameborder,allowfullscreen];' +
				'img[*]',

			disallowedContent: 'iframe[width,height]',

			requiredContent: 'h4(!widget_h4_header); div(!media_widget)',

			// convert pasted/generated markup into this widget
			upcast: function( element ) {
				return element.name === 'div' && element.hasClass('media_widget');
			},

			// the parts of the template we want to edit via the dialog
			parts: {
				title: _editables.title.selector,
				markup: _editables.markup.selector,
				caption: _editables.caption.selector,
				credit: _editables.credit.selector,
				tweet: _editables.tweet.selector,
				facebook: _editables.facebook.selector
			},

			init: function () {
				this.setData('title', this.parts.title.getText());
				this.setData('markup', this.parts.markup.getHtml());
				this.setData('caption', this.parts.caption.getText());
				this.setData('credit', this.parts.credit.getText());
				this.setData('tweet', this.parts.tweet.getText());
				this.setData('facebook', this.parts.facebook.getText());
			},

			data: function (widget) {
				this.parts.title.setHtml(widget.data.title);
				this.parts.markup.setHtml(widget.data.markup);
				this.parts.caption.setHtml(widget.data.caption);
				this.parts.credit.setHtml(widget.data.credit);
				this.parts.tweet.setHtml(widget.data.tweet);
				this.parts.facebook.setHtml(widget.data.facebook);
			}
		});

			// load the context menu
			if (editor.contextMenu) {
				editor.addMenuGroup('mediaboxGroup');
				editor.addMenuItem('mediaboxItem', {
					label: 'Convert to Mediabox',
					icon: this.path + 'icons/mediabox.png',
					command: 'mediabox',
					group: 'mediaboxGroup'
			});

			// add an event listener function that will be called whenever the context menu is fired.
			editor.contextMenu.addListener(function (element) {
				var img = element.getAscendant('img', true);
				if (img) {
					var markup = img.getOuterHtml();

					editor.execCommand('mediabox', {
						startupData: {
							markup: markup
						}
					});
					return {mediaboxItem: CKEDITOR.TRISTATE_OFF};
				}
				return false;
			});

		}
	}
});
