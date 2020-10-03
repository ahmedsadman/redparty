import Swal from 'sweetalert2';

export const getVideoId = (url) => {
	const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[7].length === 11 ? match[7] : false;
};

export const showToast = (icon, text, position = 'top', timer = 3000) => {
	const Toast = Swal.mixin({
		toast: true,
		position,
		showConfirmButton: false,
		timer,
		timerProgressBar: true,
	});

	Toast.fire({
		icon,
		title: text,
	});
};
