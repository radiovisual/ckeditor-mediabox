/* eslint-disable no-undef */

CKEDITOR.dialog.add('mediabox', function () {
	function stripCKEditorData(value) {
		if (value) {
			var element = CKEDITOR.dom.element.createFromHtml(value);
			element.removeAttribute('data-cke-saved-src');
			return element.getOuterHtml();
		}
		return null;
	}

	return {
		title: 'Edit Media Box',
		minWidth: 400,
		minHeight: 344,

		contents: [
			{
				id: 'info',
				elements: [
					{
						id: 'title',
						type: 'text',
						label: 'Title',
						validate: CKEDITOR.dialog.validate.notEmpty('Title cannot be empty. Use the youtube plugin if you just want to embed a video without sharing/caption/title, etc'),
						setup: function (widget) {
							console.log('in title:', widget.data);
							this.setValue(widget.data.title);
						},
						commit: function (widget) {
							widget.setData('title', this.getValue() || ' ');
						}
					},
					{
						id: 'markup',
						type: 'textarea',
						label: 'Markup (Embed or Image tag)',

						setup: function (widget) {
							var markup = stripCKEditorData(widget.data.markup);
							this.setValue(markup);
						},
						commit: function (widget) {
							widget.setData('markup', this.getValue() || '<iframe width="560" height="315" src="https://www.youtube.com/embed/Eq8kKeMFfC0" frameborder="0" allowfullscreen></iframe>');
						}
					},
					{
						id: 'caption',
						type: 'text',
						label: 'Caption',

						setup: function (widget) {
							this.setValue(widget.data.caption);
						},
						commit: function (widget) {
							widget.setData('caption', this.getValue() || ' ');
						}
					},
					{
						id: 'credit',
						type: 'text',
						label: 'Credit',

						setup: function (widget) {
							this.setValue(widget.data.credit);
						},
						commit: function (widget) {
							widget.setData('credit', this.getValue() || ' ');
						}
					},
					{
						id: 'tweet',
						type: 'text',
						label: 'Tweet Text',

						setup: function (widget) {
							this.setValue(widget.data.tweet);
						},
						commit: function (widget) {
							widget.setData('tweet', this.getValue() || ' ');
						}
					},
					{
						id: 'facebook',
						type: 'text',
						label: 'Facebook Text',

						setup: function (widget) {
							this.setValue(widget.data.facebook);
						},
						commit: function (widget) {
							widget.setData('facebook', this.getValue() || ' ');
						}
					}
				]
			}
		]
	};
});
