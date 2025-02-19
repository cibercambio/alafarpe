(function () {
	"use strict";

	var carousels = function () {
		$(".owl-carousel1").owlCarousel({
			loop: true,
			center: true,
			margin: 10,
			responsiveClass: true,
			nav: true,  // Asegura que las flechas estén activas
			dots: false, // Oculta los puntos de navegación
			autoplay: true, // Activa el desplazamiento automático
			autoplayTimeout: 3000, // Tiempo en milisegundos (3 segundos)
			autoplayHoverPause: true, // Pausa el carrusel si el usuario pasa el mouse
			responsive: {
			  0: {
				items: 1,
				nav: false
			  },
			  680: {
				items: 2,
				nav: false,
				loop: false
			  },
			  1000: {
				items: 3,
				nav: true
			  }
			}
		  });
		  
	};

	(function ($) {
	  carousels();
	})(jQuery);
})();
