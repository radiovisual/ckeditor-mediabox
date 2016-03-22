/* eslint-disable no-undef */

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
				allowedContent: 'iframe{*}[*]; img[*]{*}'
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

			template: '<div class="media_widget" data-type="video">' +
			'  <h4 class="widget_h4_header">Media Header Goes Here</h4>' +
			'  <div class="media_embed"><iframe width="100%" height="450px" src="https://www.youtube.com/embed/U0Z56kWNVfs" frameborder="0" allowfullscreen></iframe></div>' +
			'	<div class="widgeticon">' +
			'		<a href="#" class="fullIcon fancyboxlaunch fancybox.iframe"><i class="fa fa-arrows-alt"></i><span class="hidden"><!--ckeditor needs this span to make the widget work. facepalm.-->&nbsp;</span></a>' +
			'		<a href="#" class="shareIcon social-btn sb-closed"><i class="fa fa-external-link-square"></i><span class="hidden"><!--ckeditor needs this span to make the widget work. facepalm.-->&nbsp;</span></a>' +
			'	</div>' +
			'	<div class="caption_credit"><p><span class="caption">Caption here.</span><span class="credit">@2016 credit here.</span></p></div>' +
			'	<div class="socialbtns">' +
			'		<span class="socialbtnsIcon"><i class="fa fa-facebook"></i><span class="facebook-text">Facebook text here</span></span>' +
			'		<span class="socialbtnsIcon"><i class="fa fa-twitter"></i><span class="tweet-text">Tweet text here</span></span>' +
			'	</div>' +
			'</div>',

			editables: _editables,

			allowedContent: 'div{*}(*);' +
			'a{*}(*); i{*}[*]' +
			'a[!fullIcon,!shareIcon]{*}' +
			'div(!media_widget);' +
			'h4(!widget_h4_header);' +
			'div(!media_embed);' +
			'div(!widgeticon);' +
			'div(!caption_credit);' +
			'div(!socialbtns);' +
			'span[*]{*}; iframe[!src,frameborder,allowfullscreen];' +
			'img[*]{*}',

			disallowedContent: 'iframe[width,height];',

			requiredContent: 'div(!media_widget)',

			// convert pasted/generated markup into this widget
			// like the output from: github.com/radiovisual/ckeditor-mediaboxconvert
			upcast: function (element) {
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
	}
});
