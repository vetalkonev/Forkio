$(function () {
	$('.header__burger-menu').click(function () {
		$(this).toggleClass('header__burger-menu--active');
		$('.menu').slideToggle(500);
	});
});
