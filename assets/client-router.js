'use strict'; 

window.singlePage = window.singlePage || {}; 

singlePage.Router = class {
		
	constructor() {
		$(document).ready(() => {
			this.pagesElements = $('[id^=page-]'); 

			const pipe = singlePage.Router.pipe; 
			const displayPage = this.displayPage.bind(this); 

			//page.base('/single-page-app.html');
			page('home', pipe(displayPage, { pageId: 'home' })); 
			page('detail', pipe(displayPage, { pageId: 'detail' })); 

			page({
				hashbang: true
			}); 

		})
	}

	displayPage(attributes, context) {
		console.log('krakaaa', this.pageElements);
		let pageId = attributes.pageId;

    this.pagesElements.each(function(index, element) {
      if (element.id === 'page-' + pageId) {
        $(element).show();
      } else if (element.id === 'page-splash') {
        $(element).fadeOut(1000);
      } else {
        $(element).hide();
      }
    });
    singlePage.Router.scrollToTop();
	}

	static pipe(funct, attribute, optContinue) {
    return (context, next) => {
      if (funct) {
        const params = Object.keys(context.params);
        if (!attribute && params.length > 0) {
          funct(context.params[params[0]], context);
        } else {
          funct(attribute, context);
        }
      }
      if (optContinue) {
        next();
      }
    };
  }

  static scrollToTop() {
    $('html,body').animate({scrollTop: 0}, 0);
  }

}

singlePage.router = new singlePage.Router();
